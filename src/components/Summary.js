import React, {useEffect, useState} from 'react';
import MaterialTable from "material-table";
import axios from "axios";
import TeamModal from './TeamModal';

const Summary = () => {

  const [easternTeams, setEasternTeams] = useState([])
  const [westernTeams, setWesternTeams] = useState([])
  const handleWeb = (e) => {    // To prevent bug when pressing on team website link
    e.stopPropagation();
  }

  {/* Columns for display tables */}
  const columns = [
    { title: "Team (click on row for more stats)", field: "name" },
    { title: "Wins", field: "wins" },
    { title: "Losses", field: "losses" },
    { title: "Win%", field: "win%" },
    { title: "Venue", field: "venue" },
    { title: "Website", field: "website", render: rowData => <a onClick={handleWeb} href={rowData.website} target="_blank"> {rowData.website} </a> }  
  ]

  useEffect(() => {
    {/* Fetch Data from API Endpoints */}
    const fetchData = async () => {
      const result = await axios ("https://statsapi.web.nhl.com/api/v1/teams");
      const apiData = result.data.teams;
      const eastData = {}, westData = {};
      const fullEastData = [], fullWestData = [];
      for (let i = 0; i < apiData.length; i++) {
        const res = await axios (`https://statsapi.web.nhl.com/api/v1/teams/${apiData[i].id}/stats`);
        const teamName = res.data.stats[0].splits[0].team.name;
        const teamStats = res.data.stats[0].splits[0].stat;
        const teamRankings = res.data.stats[1].splits[0].stat;
        if (apiData[i].conference.name === "Eastern") {
          {/* Fill Data for Eastern Conference Teams */}
          eastData[teamName] = teamStats;
          eastData[teamName]["name"] = teamName;
          eastData[teamName]["win%"] = (teamStats.wins / teamStats.gamesPlayed).toFixed(3);
          eastData[teamName]["website"] = apiData[i].officialSiteUrl;
          eastData[teamName]["venue"] = apiData[i].venue.name;
          eastData[teamName]["rankings"] = teamRankings;
        } 
        else {    
          {/* Fill Data for Western Conference Teams */}
          westData[teamName] = teamStats;
          westData[teamName]["name"] = teamName;
          westData[teamName]["win%"] = (teamStats.wins / teamStats.gamesPlayed).toFixed(3);
          westData[teamName]["website"] = apiData[i].officialSiteUrl;
          westData[teamName]["venue"] = apiData[i].venue.name;
          westData[teamName]["rankings"] = teamRankings;
        }
      }
      {/* Sort Eastern Conference Teams by Seed Ranking */}
      const sortedEastData = Object.keys(eastData).sort((a,b) => {
        if (eastData[b].wins === eastData[a].wins) {
          return eastData[a].losses-eastData[b].losses
        }
        return eastData[b].wins-eastData[a].wins
      });
      for (let i = 0; i < sortedEastData.length; i++) {
        fullEastData.push(eastData[sortedEastData[i]]);
      }
      {/* Sort Western Conference Teams by Seed Ranking */}
      const sortedWestData = Object.keys(westData).sort((a,b) => {
        if (westData[b].wins === westData[a].wins) {
          return westData[a].losses-westData[b].losses
        }
          return westData[b].wins-westData[a].wins
      });
      for (let i = 0; i < sortedWestData.length; i++) {
        fullWestData.push(westData[sortedWestData[i]]);
      }
      setEasternTeams(fullEastData) 
      setWesternTeams(fullWestData)
    };
    fetchData();
  },[]);

  /* MODAL VARIABLES */
  const [displayModal, setDisplayModal] = useState(false);
  const handleClose = () => setDisplayModal(false);
  const handleShow = () => setDisplayModal(true);
  const [modalInfo, setModalInfo] = useState({});
  const toggleDisplayModal = () => {
    handleShow();
  }

  return (
    <div>
      <div className="container">

        {/* EASTERN CONFERENCE TABLE */}
        <div id="eastern">
            <MaterialTable 
            title="Eastern Conference"
            data={easternTeams}
            columns={columns}
            options={{ paging: false, search: false, sorting: false}}
            onRowClick = {
                (event, rowData) => {
                setModalInfo(rowData)
                toggleDisplayModal()
            }}
            />
         </div>

        {/* WESTERN CONFERENCE TABLE */}
        <div id="western">
            <MaterialTable
            title="Western Conference"
            data={westernTeams}
            columns={columns}
            options={{ paging: false, search: false, sorting: false}}
            onRowClick = {(event, rowData) => {
                setModalInfo(rowData)
                toggleDisplayModal()
            }}
            />
         </div>

          {/* MODAL */}
          {displayModal ?
         <TeamModal
            {...modalInfo}
            handleClose = {handleClose}
         />
         : null}

      </div>
    </div> 
  )
}

export default Summary