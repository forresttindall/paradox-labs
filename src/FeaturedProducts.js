import React from 'react';
import githubsquare from './images/githubsquare2.png';
import mesh from './images/mesh.jpg';
import litupwardriver from './images/wardriver.jpg';
import { useEthPrice } from './hooks/useEthPrice';

function FeaturedProducts() {
  const standardEthPrice = useEthPrice(10); // $10 USD
  const meshtasticEthPrice = useEthPrice(15); // $15 USD

  return (
    <section className="projectssection" aria-labelledby="services-title">
      <div id="services"></div>

      <h1 id="services-title" className="projectstitle">Featured Products</h1>

      <div className="cards-container">
        <div id="card-list2" className="card-list">
          <a href="/GithubActivityCalendar" className="card-item2 card-item-1">
            <img src={githubsquare} alt="A screenshot of a website showcasing web development services" />
            <br />
            <br />
            <h3>GitHub Activity Calendar</h3>
            <br />
            <p className="carddescription">Show off your github activity to your friends and coworkers with this easy to use calendar for your website.</p>
            <div className="price-tag">
              Ξ {standardEthPrice} ETH
            </div>
          </a>

          <a href="./MagSafeMeshtasticRadio" className="card-item-1 card-item2" aria-label="Branding services">
            <img src={mesh} alt="A meshtastic node" />
            <br />
            <br />
            <h3>MagSafe Meshtastic Radio Node</h3>
            <br />
            <p className="carddescription">Digital files for a magSafe compatible radio node for the Meshtastic project.</p>
            <div className="price-tag">
              Ξ {meshtasticEthPrice} ETH
            </div>
          </a>

          <a href="./Wardriver" className="card-item2 card-item-1">
            <img src={litupwardriver} alt="an rbg enables wardriving device" />
            <br />
            <br />
            <h3>Reactive RGB Wardriver</h3>
            <br />
            <p className="carddescription">Digital downloads of a reactive RGB wardriver thats lights up when you collect new networks.</p>
            <div className="price-tag">
              Ξ {standardEthPrice} ETH
            </div>
          </a>
        </div>
      </div>

      <a href="/shop">
        <button className="primarybutton">See All</button>
      </a>

    </section>
  );
}

export default FeaturedProducts;