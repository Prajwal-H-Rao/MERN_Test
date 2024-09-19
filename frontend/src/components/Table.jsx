import axios from "axios";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      axios
        .get("http://localhost:5000/list")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) return <h1>Loading.....</h1>;

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort function
  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort("_id")}>Emp-ID</th>
            <th>Profile</th>
            <th onClick={() => requestSort("name")}>Name</th>
            <th onClick={() => requestSort("mail")}>Mail</th>
            <th onClick={() => requestSort("designation")}>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th onClick={() => requestSort("createdate")}>Creation-Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>
                {item._id.substring(item._id.length * 0.75, item._id.length)}
              </td>
              <td>
                <img
                  src={`http://localhost:5000/${item.image}`}
                  height={200}
                  width={200}
                  alt="profile"
                />
              </td>
              <td>{item.name}</td>
              <td>{item.mail}</td>
              <td>{item.designation}</td>
              <td>{item.gender}</td>
              <td>{item.course}</td>
              <td>{new Date(item.createdate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Table;
