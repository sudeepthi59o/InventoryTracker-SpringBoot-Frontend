function Category({ category }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
      {/* Category Name */}
      <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
    </div>
  );
}

export default Category;
