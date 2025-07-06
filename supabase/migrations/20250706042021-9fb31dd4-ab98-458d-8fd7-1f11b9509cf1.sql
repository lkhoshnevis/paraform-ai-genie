
-- Create table to track user sessions and their selections
CREATE TABLE public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL UNIQUE,
  selected_roles TEXT[] NOT NULL DEFAULT '{}',
  selected_pains TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table to track demo button clicks
CREATE TABLE public.demo_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  roles TEXT[] NOT NULL DEFAULT '{}',
  pains TEXT[] NOT NULL DEFAULT '{}',
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  FOREIGN KEY (session_id) REFERENCES public.user_sessions(session_id)
);

-- Create table to store AI-generated responses for caching
CREATE TABLE public.ai_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  roles TEXT[] NOT NULL DEFAULT '{}',
  pains TEXT[] NOT NULL DEFAULT '{}',
  ai_response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  FOREIGN KEY (session_id) REFERENCES public.user_sessions(session_id)
);

-- Enable Row Level Security (make tables public for this use case)
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_responses ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (since no auth is required)
CREATE POLICY "Allow public access to user_sessions" ON public.user_sessions
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public access to demo_clicks" ON public.demo_clicks
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public access to ai_responses" ON public.ai_responses
FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_user_sessions_session_id ON public.user_sessions(session_id);
CREATE INDEX idx_demo_clicks_session_id ON public.demo_clicks(session_id);
CREATE INDEX idx_ai_responses_session_id ON public.ai_responses(session_id);
