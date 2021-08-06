import { logos } from "../utilities/bookmakerLogos";
import { checkComplementary } from "../functions/checkComplementary";
import InitialOdds from "../components/InitialOdds";

export const fetchOdds = async () => {
  try {
    const response = await fetch(
      "http://localhost:3004/mybet21/oddsmatcher"
    );
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    let odds = parsedResponse.map((odd) => {
      return {
        ...odd,
        book_one_image: (
          <img src={logos[odd.book_one]} alt={logos[odd.book_one]} />
        ),
        book_two_image: (
          <img src={logos[odd.book_two]} alt={logos[odd.book_two]} />
        ),
      };
    });
    odds = odds.filter((odd) => odd.roi <= 110);
    odds.sort((a, b) => {
      return b.roi - a.roi;
    });
    return { odds };
  } catch (error) {
    console.log(error);
  }
};

export const fetchHistory = async () => {
  try {
    // Adding history to the for every match
    const rawHistory = await fetch(
      "https://odds-and-db-be-server.herokuapp.com/mybet21/history"
    );
    const history = await rawHistory.json();
    // history = history.map((odd, i) => {
    //   const rawInfo = history.filter(
    //     (info) => info.univoca === `${odd.home}${odd.away}${odd.book_one}`
    //   );
    //   if (rawInfo !== undefined) {
    //     odd.historyInfo = rawInfo[0];
    //     let data = odd.historyInfo[odd.odd_one_type];
    //     data === undefined ? (data = "Non Disponibile") : (data = data);
    //     let complementaryData = checkComplementary(
    //       odd.odd_one_type,
    //       odd.historyInfo,
    //       history,
    //       odd.home,
    //       odd.away,
    //       odd.book_one
    //     );

    //     return {
    //       ...odd,
    //       quotaIniziale:
    //         complementaryData === undefined ? (
    //           "@" + data
    //         ) : (
    //           <InitialOdds info={complementaryData} />
    //         ),
    //       complementaryData: complementaryData,
    //     };
    //   }
    // });
  } catch (error) {
    console.log(error);
  }
};
