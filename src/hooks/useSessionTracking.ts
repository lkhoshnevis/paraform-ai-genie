
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSessionTracking = () => {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Generate or retrieve session ID
    let currentSessionId = localStorage.getItem('paraform_session_id');
    if (!currentSessionId) {
      currentSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('paraform_session_id', currentSessionId);
    }
    setSessionId(currentSessionId);
  }, []);

  const saveUserSession = async (roles: string[], pains: string[]) => {
    if (!sessionId) return;

    try {
      const { error } = await supabase
        .from('user_sessions')
        .upsert({
          session_id: sessionId,
          selected_roles: roles,
          selected_pains: pains,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'session_id'
        });

      if (error) {
        console.error('Error saving user session:', error);
      } else {
        console.log('User session saved successfully');
      }
    } catch (error) {
      console.error('Error in saveUserSession:', error);
    }
  };

  const trackDemoClick = async (roles: string[], pains: string[]) => {
    if (!sessionId) return;

    try {
      const { error } = await supabase
        .from('demo_clicks')
        .insert({
          session_id: sessionId,
          roles: roles,
          pains: pains
        });

      if (error) {
        console.error('Error tracking demo click:', error);
      } else {
        console.log('Demo click tracked successfully');
      }
    } catch (error) {
      console.error('Error in trackDemoClick:', error);
    }
  };

  return {
    sessionId,
    saveUserSession,
    trackDemoClick
  };
};
