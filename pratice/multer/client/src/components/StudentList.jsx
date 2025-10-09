const StudentList = ({students , onEdit , onDelete}) => {

  return (
    <>
      <div className="relative overflow-x-auto container mx-auto mt-28">
        <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 table-fixed text-center">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Student Name
              </th>
              <th scope="col" className="px-6 py-3">
                Student Age
              </th>
              <th scope="col" className="px-6 py-3">
                Student Email
              </th>
              <th scope="col" className="px-6 py-3">
                Student Course
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((std, index) => {
              return (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <td className="px-6 py-4">{std.name}</td>
                  <td className="px-6 py-4">{std.email}</td>
                  <td className="px-6 py-4">{std.age}</td>
                  <td className="px-6 py-4">{std.course}</td>
                  <td className="space-x-8">
                    <button className="btn" onClick={
                      () => onEdit(std)
                    }>Update</button>
                    <button className="btn" onClick={() => onDelete(std._id
                    )}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentList;
