import React, { useEffect,  } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState("all");

  useEffect(() => {
    let foodData = async () => {
      setLoading(true);

      try {
        let res = await fetch(BASE_URL);

        let datalog = await res.json();

        setData(datalog);
        setFilteredData(datalog);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    foodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    // console.log(searchValue);

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelected("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelected(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading.....</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="search">
            <input
              onChange={searchFood}
              type="text"
              placeholder="Search Food..."
            />
          </div>
        </TopContainer>

        <FilterContainer>
          {filterBtns.map((btn) => (
            <Button
              isSelected={selected === btn.type}
              key={btn.name}
              onClick={() => filterFood(btn.type)}
            >
              {btn.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>

      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 14px;
  padding-bottom: 25px;
`;
export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#ff0000dc" : "#ff4343")};
  outline: 2px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 14px;
  border: none;
  font-size: 15px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #ff0000dc;
  }
`;
