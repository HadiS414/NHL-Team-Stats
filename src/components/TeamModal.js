import React from 'react';
import {Modal, Button } from "react-bootstrap";

const TeamModal = (props) => {

  return (
        <Modal size="lg" show={true} onHide={props.handleClose} aria-labelledby="contained-model-title-vcenter">
          <Modal.Header>
            <Modal.Title> <h2> {props.name} </h2> </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid"> 
            <div className="container">
              <div className="row"> 
                <div className="col">
                  <h4> Offense </h4>
                  <div className="row">
                  <p> Goals per game: {props.goalsPerGame} ({props.rankings["goalsPerGame"]} in league) </p>
                  </div>
                  <div className="row">
                  <p> Shots per game: {props.shotsPerGame} ({props.rankings["shotsPerGame"]} in league) </p>
                  </div>
                  <div className="row">
                  <p> Shooting percentage: {props.shootingPctg}% ({props.rankings["shootingPctRank"]} in league) </p>
                  </div>
                  <div className="row">
                  <p> Power play goals: {props.powerPlayGoals} ({props.rankings["powerPlayGoals"]} in league) </p>
                  </div>
                  <div className="row">
                  <p> Power Play Percentage: {props.powerPlayPercentage}% ({props.rankings["powerPlayPercentage"]} in league) </p>
                  </div>
                </div>
                <div className="col">
                  <h4> Defense </h4>
                  <div className="row">
                  <p> Goals against per game: {props.goalsAgainstPerGame} ({props.rankings["goalsAgainstPerGame"]} in league) </p> 
                  </div>
                  <div className="row">
                  <p> Shots allowed per game: {props.shotsAllowed} ({props.rankings["shotsAllowed"]} in league) </p>
                  </div>
                  <div className="row">
                  <p> Save percetage: {props.savePctg}% ({props.rankings["savePctRank"]} in league) </p> 
                  </div>
                  <div className="row">
                  <p> Power play goals against: {props.powerPlayGoalsAgainst} ({props.rankings["powerPlayGoalsAgainst"]} in league) </p> 
                  </div>
                  <div className="row">
                  <p> Penalty kill percentage: {props.penaltyKillPercentage}% ({props.rankings["penaltyKillPercentage"]} in league) </p> 
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal> 
  )
}

export default TeamModal