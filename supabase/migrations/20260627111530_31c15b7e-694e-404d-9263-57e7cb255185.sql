
DROP POLICY IF EXISTS "Anyone can submit contact" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
REVOKE INSERT ON public.contact_submissions FROM anon, authenticated;
REVOKE INSERT ON public.newsletter_subscribers FROM anon, authenticated;
