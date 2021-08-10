import { logos } from "../utilities/bookmakerLogos";

export const fetchOdds = async () => {
  try {
    const response = await fetch(
      "https://odds-and-db-be-server.herokuapp.com/mybet21/oddsmatcher"
    );
    const parsedResponse = await response.json();
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