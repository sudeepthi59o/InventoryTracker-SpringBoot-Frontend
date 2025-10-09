function Supplier({ supplier }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-semibold text-gray-800">{supplier.name}</h3>
    </div>
  );
}

export default Supplier;
