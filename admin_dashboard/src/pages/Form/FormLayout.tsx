import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Workout } from "../../types/data";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPackage } from "../../store/packageSlice";
import { addWorkout } from "../../store/workoutSlice";
import { useNavigate } from "react-router-dom";
import { authStatus } from "../../types/status";

const FormLayout = () => {

  const navigate =useNavigate()
  const [formData, setFormData] = useState<Workout>({
    workoutName: "",
    type: "",
    level: "",
    duration: 1,
    description: "",
    packageId: "",
    id: "",
    userId: ""
  });

  const dispatch = useAppDispatch();
  const { packages } = useAppSelector((state) => state.package);
  const { status ,singleWorkout} = useAppSelector((state) => state.workout);
  
  useEffect(() => {
    dispatch(fetchPackage());
  }, [dispatch]);
   
  useEffect(() => {
    if (status === authStatus.success && singleWorkout&& singleWorkout.id) {
      navigate("/tables");
    }
  }, [status, singleWorkout, navigate]);
 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
       ...prev, 
       [name]: value 
      })
    );
  };

 
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    dispatch(addWorkout(formData))
  };
 

  return (
    <>
      <Breadcrumb pageName="Add Workout" />

      <div className="h-full w-full flex justify-center items-center py-10">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="border-b border-gray-200 py-5 px-6 dark:border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Add Workout
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              {/* Workout Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Workout Name
                </label>
                <input
                  type="text"
                  name="workoutName"
                  placeholder="Enter workout name"
                  value={formData.workoutName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-sm text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  required
                />
              </div>

              {/* Type */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleSelectChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-sm text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  required
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="cardio">Cardio</option>
                  <option value="strength">Strength</option>
                  <option value="flexibility">Flexibility</option>
                </select>
              </div>

              {/* Level */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Level
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleSelectChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-sm text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  required
                >
                  <option value="" disabled>
                    Select Level
                  </option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  name="duration"
                  placeholder="Enter duration in minutes"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-sm text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <input
                  name="description"
                  placeholder="Enter a brief description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-sm text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                ></input>
              </div>

              {/* Package Selection */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Package
                </label>
                <select
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleSelectChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-sm text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  required
                >
                  <option value="" disabled>
                    Select a Package
                  </option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.packageName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-lg bg-primary py-3 px-5 text-sm font-medium text-white transition hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:bg-primary-dark"
              >
                Submit Workout
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
