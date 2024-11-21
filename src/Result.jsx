import React from "react";

function Result({ setIsFinished,setQuestionTimer,questions, realAnswers, userAnswers }) {
  return (
    <div className="flex flex-col justify-start items-start w-full md:w-1/2 m-auto">
      <div className="flex w-full">
        <div className="w-8/12 md:w-10/12 text-start border-l border-l-black p-2">Questions</div>
        <div className="w-2/12 md:w-1/12 border-l border-l-black text-sm text-center">Answer Key</div>
        <div className="w-2/12 md:w-1/12 border-x border-x-black text-sm text-center">User Answers</div>
      </div>
      <div className="flex flex-col">
        {questions.map((question, index) => (
          <div className="flex border-y border-y-black" key={index}>
            <div className="w-8/12 md:w-10/12  p-2 border-l border-l-black">{question.body}</div>
            <div className="w-2/12 md:w-1/12 flex justify-center items-center border-l border-l-black p-2">
              {realAnswers[index]}
            </div>
            <div className="w-2/12 md:w-1/12 flex justify-center items-center border-x border-x-black p-2">
              {userAnswers[index]}
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={() => {
            setIsFinished(false);
            setQuestionTimer(30);
        }}
        className="w-full bg-slate-900 text-white py-4 px-8 my-4">
        Yeni Test Baslat
      </button>
    </div>
  );
}

export default Result;
