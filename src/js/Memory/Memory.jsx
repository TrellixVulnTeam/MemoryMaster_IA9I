import React, { useState, useEffect} from "react";
import { v4 as uuid } from "uuid";
import contentImg from "../../cards";
import Card from "../Card/Card";
import deepcopy from "deepcopy";

function shuffleArray(array) {
    return array.sort(() => .5 - Math.random());
}

function generateCards(count) {
    if (count % 2 !== 0) 
        throw "Even number is required, but it is " + count;

    const cards = shuffleArray(contentImg)
    .slice(0, count / 2)
    .map(imgURL => ({
        id: uuid(),
        imgURL: "assets/img/cards/" + imgURL,
        flipped: false,
        flippable: true
    }))
    .flatMap(e => [e, {...deepcopy(e), id: uuid()}]);

    return shuffleArray(cards);
}

function Memory({fieldWidth=4, fieldHeight=4}) {
    const totoalCards = fieldWidth * fieldHeight;

    const [cards, setCards] = useState(generateCards(totoalCards));
    const [flippable, setFlippable] = useState(false);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);

    function setCardFlipped(cardID, flipped) {
        setCards(prevState => prevState.map(c => {
            if (c.id !== cardID)
                return c;
             return {...c, flipped};
        }));
    }

    function setCardFlippable(cardID, flippable) {
        setCards(prevState => prevState.map(c => {
            if (c.id !== cardID)
                return c;
            return {...c, flippable};
        }));
    }

    useEffect(() => {
        setTimeout(() => {
            let index = 0;
            for (const card of cards) {
                setTimeout(() => setCardFlipped(card.id, true), index++ * 100);
            }
            setTimeout(() => setFlippable(true), cards.length * 100);
        }, 3000);
    }, []);

    function resetTwoCards() {
        setFirstCard(null);
        setSecondCard(null);
    }

    function onMatchedCards() {
        setCardFlippable(firstCard.id, false);
        setCardFlippable(secondCard.id, false);
        setCardFlipped(firstCard.id, false);
        setCardFlipped(secondCard.id, false);
        resetTwoCards();
    }

    function onUnmatchedCards() {
        const firstCardID = firstCard.id;
        const secondCardID = secondCard.id;

        setTimeout(() => {
            setCardFlipped(firstCardID, true);
        }, 1000);
        setTimeout(() => {
            setCardFlipped(secondCardID, true);
        }, 1200);

        resetTwoCards();
    }

    useEffect(() => {
        if (!firstCard || !secondCard)
            return;
            (firstCard.imgURL === secondCard.imgURL) ? onMatchedCards() : onUnmatchedCards();
        }, [firstCard, secondCard]);

        function onClickCard(card) {
            if (!flippable)
            return;
            if (!card.flippable)
            return;
            if((firstCard && (card.id === firstCard.id) || (secondCard && (card.id === secondCard.id))))
            return;

            setCardFlipped(card.id, false);

            (firstCard) ? setSecondCard(card) : setFirstCard(card);
        }

        return (
        <>
            <div className="logo">Remember Me!</div>
            <div className="Dad">작은것에 감동하는 것이 행복의 시작이 된다.</div>
        <div className="game container">
            <div className="cards-container">
                {cards.map(card => <Card onClick={() => onClickCard(card)} key={card.id} {...card} />)}
            </div>
        </div>
        </>
        );
        
}

export default Memory;

