import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPackage } from "../../store/packageSlice";

const TableTwo = () => {
  const dispatch = useAppDispatch();
  const { packages } = useAppSelector((state) => state.package);

  useEffect(() => {
    dispatch(fetchPackage());
  }, []);

  return (
    <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
      {/* Header */}
      <div className="py-6 px-5 md:px-8 xl:px-10">
        <h4 className="text-2xl font-bold text-black dark:text-white">
          Our Packages
        </h4>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 border-t border-stroke bg-gray-50 py-4 px-4 dark:border-strokedark dark:bg-gray-800 sm:grid-cols-8 md:px-6 2xl:px-8">
        <div className="col-span-3 flex items-center">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Package Image & ID
          </p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Package Name
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Price
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Description
          </p>
        </div>
      </div>

      {/* Table Rows */}
      {packages.length > 0 &&
        packages.map((pack, key) => (
          <div
            className="grid grid-cols-6 items-center border-t border-stroke bg-white hover:bg-gray-100 py-4 px-4 dark:border-strokedark dark:bg-boxdark dark:hover:bg-gray-700 sm:grid-cols-8 md:px-6 2xl:px-8"
            key={key}
          >
            {/* Package Image & ID */}
            <div className="col-span-3 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-14 w-14 rounded-md bg-gray-200 overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src="https://plus.unsplash.com/premium_photo-1661265933107-85a5dbd815af?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3ltfGVufDB8fDB8fHww"
                    alt="Package"
                  />
                </div>
                <p className="text-sm font-medium text-black dark:text-white">
                  {pack?.id}
                </p>
              </div>
            </div>

            {/* Package Name */}
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {pack?.packageName}
              </p>
            </div>

            {/* Price */}
            <div className="col-span-1 flex items-center">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                ${pack?.price}
              </p>
            </div>

            {/* Description */}
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {pack?.description}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TableTwo;
