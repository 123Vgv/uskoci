package com.randombit.uskoci.game;

import com.randombit.uskoci.card.dao.CardDAO;
import com.randombit.uskoci.card.model.Card;

import java.util.Collection;
import java.util.List;

public interface GameController {
    /**
     * Get the Id of the player that is on the move
     * @return playerOnTHeMoveId
     */
    public int getCurrentPlayerId();

    /**
     * Set the id of player on the move to the next player
     * @return playerOnTheMoveId
     */
    public int setNextPlayer();

    public List<Card> getCardsInTheDeck();

    public void putCardOnTheTable(int id);

    public String resetGame();

    public boolean startGame(int numberOfPlayers);

    public void setCardDAO(CardDAO cardDAO);

    public List<Card> getPlayerCards(int playedId);

    public Card drawCard(int playerId);

    public int getCurrentPhase();

    public int setNextPhase();

}
