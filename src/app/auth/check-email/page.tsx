export default function CheckEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-2">Verify your email</h1>
      <p className="text-center max-w-md text-muted-foreground">
        We{"'"}ve sent a link to your email address. Please click the link to
        verify your account before logging in.
      </p>
    </div>
  );
}
