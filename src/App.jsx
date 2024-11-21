import { useEffect, useState } from "react";

import "./App.css";
import Result from "./Result";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectable, setSelectable] = useState(false);
  const optionsKey = ["A", "B", "C", "D"];
  const [questionTimer, setQuestionTimer] = useState(30);
  const [selectedOption, setSelectedOption] = useState("-");
  const [isFinished, setIsFinished] = useState(false);
  const answerKey = ["D","B","C","A","B","C","C","D","A","B"]
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setCurrentQuestionIndex(0);
        setCurrentOptions(data[0].title.split(" ", 4));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setSelectable(false);
    setTimeout(() => {
      setSelectable(true);
    }, 10000);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (!questionTimer) {
      // cevabi kaydet
      setSelectedOptions([...selectedOptions, selectedOption]);
      // secilen cevap state sifirla
      setSelectedOption("-");

      if(currentQuestionIndex == 9){
        setCurrentQuestionIndex(0)
        setQuestionTimer(30)
        setSelectable(false)
        setCurrentOptions(
          questions[0].title.split(" ", 4)
        );
        // bitti
        setIsFinished(true);
        return;
      }
      // yeni soruyu ayarla
      setCurrentQuestionIndex(Number(currentQuestionIndex) + 1);
      // yeni secenekleri ayarla
      setCurrentOptions(
        questions[Number(currentQuestionIndex) + 1].title.split(" ", 4)
      );
      setQuestionTimer(30);

      return;
    }
    let timer = setInterval(() => {
      setQuestionTimer(questionTimer - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [questionTimer]);

  const saveChoice = () => {
    // cevabi kaydet
    setSelectedOptions([...selectedOptions, selectedOption]);
    // optioni resetle
    setSelectedOption("-");
    // siradaki soruya gecmeden once bitim kontrolu
    if (currentQuestionIndex == 9) {
      // bazi degerleri baslangic degerine set et
      setCurrentQuestionIndex(0)
      setQuestionTimer(30)
      setSelectable(false)
      setCurrentOptions(
        questions[0].title.split(" ", 4)
      );
      // bitti
      setIsFinished(true);
    } else {
      // siradaki soruya gec
      setCurrentQuestionIndex(Number(currentQuestionIndex) + 1);
      // siradaki sorunun seceneklerini kaydet
      setCurrentOptions(
        questions[Number(currentQuestionIndex) + 1].title.split(" ", 4)
      );
      // timeri yenile
      setQuestionTimer(30);
    }
  };
  return (
    <>
      {isFinished ? (
        <Result 
          setIsFinished={setIsFinished}
          setQuestionTimer={setQuestionTimer}
          questions={questions} 
          userAnswers={selectedOptions} 
          realAnswers={answerKey} />
      ) : (
        <div className="bg-slate-300 w-screen h-screen flex items-center justify-center">
          <div className="bg-white flex w-full max-w-[700px] min-h-[500px] rounded-lg">
            {questions[currentQuestionIndex] && currentOptions ? (
              <div className="flex flex-col p-8">
                <div className="ml-auto text-xl">{questionTimer}</div>
                <a className="text-2xl">
                  {"Soru " + (Number(currentQuestionIndex) + 1)}
                </a>
                <p className="text-lg mt-8">
                  {questions[currentQuestionIndex].body}
                </p>
                <div className="flex flex-col gap-2 mt-8 items-center">
                  {currentOptions.map((item, id) => (
                    <button
                      onClick={() => setSelectedOption(optionsKey[id])}
                      disabled={selectable ? false : true}
                      key={id}
                      className={
                        "w-full md:w-1/2 bg-white border-2  p-2 rounded-md text-base text-start " +
                        (!selectable
                          ? "text-slate-400 border-slate-400 hover:cursor-not-allowed "
                          : selectedOption == optionsKey[id]
                          ? "bg-slate-800 text-white border-slate-800 "
                          : " border-slate-800 text-slate-900")
                      }
                    >
                      {optionsKey[id] + ") " + item}
                    </button>
                  ))}
                </div>
                {selectable ? (
                  <button
                    onClick={saveChoice}
                    className="bg-slate-900 text-white px-8 py-2 rounded-lg self-center w-full md:w-auto md:ml-auto mt-8"
                  >
                    Kaydet
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
