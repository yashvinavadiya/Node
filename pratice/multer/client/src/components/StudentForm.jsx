import { useState, useEffect } from "react";

const StudentForm = ({onSave , editStudent , setEditStudent}) => {

  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    course: "",
  });

  console.log("form :" , form);
  
  useEffect(() => {
    if(editStudent) setForm(editStudent)
  } , [editStudent])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]:e.target.value });    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form)
    setForm({name:"" , email:"" , course:"" , age:""})
    setEditStudent(null)
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          required
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="age"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={form.age}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="course"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Course
        </label>
        <input
          type="text"
          id="course"
          name="course"
          value={form.course}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={handleChange}
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            defaultValue=""
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Remember me
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {form._id ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default StudentForm;
