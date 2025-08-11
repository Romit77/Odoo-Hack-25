const FormField = ({ label, name, type = "text", register, error }) => (
  <div className="mb-6">
    <label className="block mb-2 text-sm font-semibold text-gray-800">
      {label}
    </label>
    <input
      type={type}
      placeholder={label}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm"
      {...register(name)}
    />
    {error && (
      <span className="text-red-500 text-xs mt-1 block">{error.message}</span>
    )}
  </div>
);

export default FormField;
