const FormField: React.FC<{
  children: React.ReactNode;
  error?: string;
}> = ({ children, error }) => (
  <div>
    {children}
    {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
  </div>
);

export default FormField;
