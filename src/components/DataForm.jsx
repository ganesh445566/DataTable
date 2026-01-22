import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addRow } from "../features/table/tableSlice";

const DataForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addRow(data));
    reset();
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Add New Record</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <div className="invalid-feedback">Name is required</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">Valid email is required</div>
              )}
            </div>

            {/* Age */}
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className={`form-control ${errors.age ? "is-invalid" : ""}`}
                placeholder="Enter age"
                {...register("age", { required: true, min: 18 })}
              />
              {errors.age && (
                <div className="invalid-feedback">Age must be 18+</div>
              )}
            </div>

            {/* City */}
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
                placeholder="Enter city"
                {...register("city", { required: true })}
              />
              {errors.city && (
                <div className="invalid-feedback">City is required</div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">
              Add Record
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataForm;
