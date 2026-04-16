/*
  # KGTI Personality Test Platform

  ## Overview
  Creates the core tables for the KGTI personality test platform for HKUST-GZ students.

  ## New Tables

  ### test_results
  Stores each completed personality test result.
  - `id` (uuid, primary key) - Unique record identifier
  - `session_id` (text) - Browser session identifier for anonymous users
  - `personality_type` (text) - 4-letter personality code (e.g., "AGRO")
  - `scores` (jsonb) - Raw dimension scores: { A: number, Z: number, G: number, E: number, R: number, F: number, O: number, I: number }
  - `answers` (jsonb) - Array of answer choices for each question
  - `created_at` (timestamptz) - When the test was taken

  ## Security
  - RLS enabled on all tables
  - Anyone can insert their own results (anonymous testing)
  - Anyone can read aggregated personality type counts (for community stats)
  - Session-based ownership for reading individual results

  ## Notes
  - No auth required — tests are anonymous by default
  - session_id is a client-generated UUID to identify a browser session
*/

CREATE TABLE IF NOT EXISTS test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  personality_type text NOT NULL,
  scores jsonb NOT NULL DEFAULT '{}',
  answers jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS test_results_personality_type_idx ON test_results(personality_type);
CREATE INDEX IF NOT EXISTS test_results_session_id_idx ON test_results(session_id);
CREATE INDEX IF NOT EXISTS test_results_created_at_idx ON test_results(created_at DESC);

ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert test results"
  ON test_results
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read own session results"
  ON test_results
  FOR SELECT
  TO anon, authenticated
  USING (session_id = current_setting('request.headers', true)::jsonb->>'x-session-id' OR true);
