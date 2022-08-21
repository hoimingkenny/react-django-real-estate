import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import {makeStyles} from "@mui/styles";

// React Leaflet
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import {Icon} from 'leaflet'
// MUI
import {Grid, AppBar, Typography, Button} from '@mui/material'

// Map icons
import houseIconPng from "../static/mapicons/house.png";
import apartmentIconPng from "../static/mapicons/apartment.png";
import officeIconPng from "../static/mapicons/office.png";
// DummyData
import myListings from "../static/data/Dummydata.js";


const useStyles = makeStyles({
  cardStyle: {
    margin: "0.5rem",
    border: "1px solid black",
    position: "relative",
  },
  pictureStyle: {
    paddingRight: "1rem",
    paddingLeft: "1rem",
    height: "20rem",
    width: "30rem",
    cursor: "pointer",
  },
  priceOverlay: {
    position: "absolute",
    backgroundColor: "green",
    zIndex: "1000",
    color: "white",
    top: "100px",
    left: "20px",
    padding: "5px",
  },
});

function Listings() {
  const classes = useStyles();

  const houseIcon = new Icon({
    iconUrl: houseIconPng, iconSize: [40, 40],
  });

  const apartmentIcon = new Icon({
    iconUrl: apartmentIconPng, iconSize: [40, 40],
  });

  const officeIcon = new Icon({
    iconUrl: officeIconPng, iconSize: [40, 40],
  });


  // const [latitude, setLatitude] = useState(51.48740865233002);
  // const [longitude, setLongitude] = useState(-0.12667052265135625);

  return (<Grid container>
    <Grid item xs={4}>
      {myListings.map((listing) => {
        return (<Card key={listing.id} className={classes.cardStyle}>
          <CardHeader
              title={listing.title}
          />
          <CardMedia
              className={classes.pictureStyle}
              component="img"
              image={listing.picture1}
              alt={listing.title}
          />
          <CardContent>
            <Typography variant="body2">
              {listing.description.substring(0, 150)}...
            </Typography>
          </CardContent>

          {listing.property_status === "Sale" ? (
              <Typography className={classes.priceOverlay}>
                {listing.listing_type}: $
                {listing.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Typography>
          ) : (
              <Typography className={classes.priceOverlay}>
                {listing.listing_type}: $
                {listing.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                / {listing.rental_frequency}
              </Typography>
          )}
        </Card>)
      })}
    </Grid>
    <Grid item xs={8} style={{marginTop: "0.5rem"}}>
      <AppBar position={"sticky"}>
        <div style={{height: '100vh'}}>
          <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height: '100vh'}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {myListings.map((listing) => {
              function IconDisplay() {
                if (listing.listing_type === "House") {
                  return houseIcon;
                } else if (listing.listing_type === "Apartment") {
                  return apartmentIcon;
                } else if (listing.listing_type === "Office") {
                  return officeIcon;
                }
              }

              return (<Marker key={listing.id}
                              icon={IconDisplay()}
                              position={[listing.location.coordinates[0], listing.location.coordinates[1]]}>
                <Popup>
                  <Typography variant="h5">{listing.title}</Typography>
                  <img
                      src={listing.picture1}
                      style={{
                        height: "14rem", width: "18rem", cursor: "pointer",
                      }}
                      alt={listing.picture1}
                  />
                  <Typography variant="body1">
                    {listing.description.substring(0, 150)}...
                  </Typography>
                  <Button
                      variant="contained"
                      fullWidth
                  >
                    Details
                  </Button>
                </Popup>
              </Marker>)
            })}
          </MapContainer>
        </div>
      </AppBar>
    </Grid>
  </Grid>);
}

export default Listings;