
CREATE POLICY "no public select" ON public.contact_submissions FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "no public select" ON public.newsletter_subscribers FOR SELECT TO anon, authenticated USING (false);
