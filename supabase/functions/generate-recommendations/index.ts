
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, roles, pains } = await req.json();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if we already have a cached response for this combination
    const { data: cachedResponse } = await supabase
      .from('ai_responses')
      .select('ai_response')
      .eq('session_id', sessionId)
      .eq('roles', roles)
      .eq('pains', pains)
      .single();

    if (cachedResponse) {
      console.log('Returning cached response for session:', sessionId);
      return new Response(JSON.stringify({ 
        recommendations: cachedResponse.ai_response,
        cached: true 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate prompt based on selections
    const rolesText = roles.map((role: string) => role.replace('-', ' ')).join(', ');
    const painsText = pains.map((pain: string) => pain.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())).join(', ');

    const prompt = `As a hiring expert specializing in startup recruitment, generate personalized recommendations for a company hiring for these roles: ${rolesText}. They're facing these specific challenges: ${painsText}.

Provide 3-4 specific, actionable recommendations that directly address their challenges. Each recommendation should:
1. Be specific to their role types and pain points
2. Include concrete steps they can take
3. Mention how Paraform specifically solves their challenges
4. Be concise (2-3 sentences each)

Format the response as a JSON object with a "recommendations" array, where each item has "title" and "description" fields.`;

    console.log('Generating AI recommendations for:', { sessionId, roles, pains });

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert in startup hiring and recruitment. Provide specific, actionable advice in JSON format.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!openAIResponse.ok) {
      throw new Error(`OpenAI API error: ${openAIResponse.statusText}`);
    }

    const aiData = await openAIResponse.json();
    const aiRecommendations = aiData.choices[0].message.content;

    // Cache the AI response
    await supabase
      .from('ai_responses')
      .insert({
        session_id: sessionId,
        roles: roles,
        pains: pains,
        ai_response: aiRecommendations
      });

    console.log('Generated and cached new AI recommendations for session:', sessionId);

    return new Response(JSON.stringify({ 
      recommendations: aiRecommendations,
      cached: false 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-recommendations function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallback: "Based on your selections, we recommend using Paraform's network of specialized recruiters to accelerate your hiring process and reduce the manual workload while ensuring quality matches."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
