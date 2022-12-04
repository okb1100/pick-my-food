import React, { useEffect, useState } from "react";

type Food = {
  name: string;
};

function App() {
  const [foodList, setFoodList] = useState<Food[]>([]);
  const [foodInput, setFoodInput] = useState("");
  const [listShown, setListShown] = useState(false);
  const [randomChoice, setRandomChoice] = useState(-1);

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem("foodList") || "")
      setFoodList(list)
    } catch (error) {
      setFoodList([])
    }
  }, [])

  const addFood = () => {
    if (foodInput.length > 0) {
      setFoodList((prev) => {
        const _new = [...prev, { name: foodInput }];
        localStorage.setItem("foodList", JSON.stringify(_new));
        return _new;
      });
    }
    setFoodInput("");
  };

  const removeFood  = (index: number) => {
    setFoodList(prev => prev.filter((v,i) => i !== index))
  }

  const random = (end: number) => Math.floor(Math.random() * end);
  const makeRandomChoice = () => {
    const newRandomChoice = random(foodList.length);
    setRandomChoice(newRandomChoice);
  };

  const toggleList = () => setListShown((prev) => !prev);

  return (
    <div className="App">
      <div className="flex flex-col lg:px-0 px-8 items-center flex-1 bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400 w-screen h-screen">
        <div className="flex lg:w-1/2 flex-col rounded-3xl mt-8 w-full p-10 border-white border  text-white bg-white bg-opacity-20">
          <h1 className="text-center text-4xl">
            <span className="block text-5xl">🍱</span>
            I'll tell you what to eat
          </h1>

          <h3 className="text-center text-xl">
            From{" "}
            <span
              onClick={toggleList}
              className="cursor-pointer underline-offset-2 underline"
            >
              {foodList.length}
            </span>{" "}
            choice{foodList.length > 1 ? "s" : ""} you added so far.
          </h3>

          <div className="m-2 my-8 w-full relative focus-within:text-gray-700">
            <input
              value={foodInput}
              onChange={(e) => setFoodInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addFood();
                }
              }}
              className="focus:bg-white focus:text-gray-800 focus:placeholder-gray-700 outline-white rounded-xl w-full p-4 placeholder-white bg-transparent border border-white"
              type="text"
              placeholder="Add your usual food..."
              name="food"
            />
            <span
              onClick={addFood}
              className="cursor-pointer absolute right-2.5 top-3 w-8 h-8 text-center justify-center items-center flex"
            >
              ⏎
            </span>
          </div>
        </div>

        {randomChoice > -1 ? (
          <>
          <div className="flex flex-col rounded-3xl lg:w-1/2 w-full m-4 p-10 border-white border  text-white bg-white bg-opacity-20">
            <h4 className="text-xl">You will eat</h4>
            <h3 className="text-3xl">
              {foodList[randomChoice].name}{" "}
              <span className="text-2xl">today.</span>
            </h3>
          </div>
          <button
            onClick={() => setRandomChoice(-1)}
            // disabled={!foodList.length}
            className="cursor-pointer lg:w-1/2  flex flex-col rounded-3xl w-full m-4 p-10 text-2xl items-center  border border-white text-white bg-white bg-opacity-20"
          >
            Thanks
          </button>
          </>
        ) : (
          <button
            onClick={makeRandomChoice}
            disabled={!foodList.length}
            className="cursor-pointer lg:w-1/2  transition-colors  flex flex-col rounded-3xl w-full m-4 p-10 text-2xl items-center border border-white text-white bg-white bg-opacity-20"
          >
            Please do
          </button>
        )}

        {listShown && (
          <div className="fixed flex flex-1 flex-col lg:px-0 px-4 justify-center items-center w-screen h-screen overflow-y-scroll bg-opacity-90 backdrop-blur-lg">
            <div className="shadow-lg flex flex-col  lg:w-1/2 w-full rounded-3xl p-10 bg-white bg-opacity-20 text-white border border-white">
              <div className="flex flex-row-reverse justify-between">
                <span onClick={toggleList} className="cursor-pointer underline">
                  Close
                </span>
                <h3 className="text-2xl">Your choices</h3>
              </div>

              <div>
                {foodList.length ? (
                  foodList.map((f, i) => (
                    <div className="flex flex-row justify-between border-b py-4" key={i}>
                      <span>{f.name}</span>
                      <span onClick={() => removeFood(i)} className="cursor-pointer underline">remove</span>
                    </div>
                  ))
                ) : (
                  <h4 className="text-center">Add your food.</h4>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
