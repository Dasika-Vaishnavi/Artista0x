pragma solidity ^0.8.0;

contract ArtworkRegistry {

    struct Artwork {
        string artistName;
        string artworkTitle;
        uint256 dateOfCreation;
        address owner;
    }

    mapping(bytes32 => Artwork) artworks;
    mapping(bytes32 => bool) uniqueIdentifiers;

    function registerArtwork(string memory artistName, string memory artworkTitle, uint256 dateOfCreation, bytes32 hash) public {
        require(!uniqueIdentifiers[hash], "Artwork already registered");
        uniqueIdentifiers[hash] = true;
        
        Artwork memory newArtwork = Artwork(artistName, artworkTitle, dateOfCreation, msg.sender);
        artworks[hash] = newArtwork;
    }

    function authenticateArtwork(bytes32 hash) public view returns (bool) {
        return artworks[hash].owner == msg.sender;
    }

    function getArtwork(bytes32 hash) public view returns (string memory, string memory, uint256, address) {
        Artwork memory artwork = artworks[hash];
        return (artwork.artistName, artwork.artworkTitle, artwork.dateOfCreation, artwork.owner);
    }
}

address public priceFeed;

constructor(address _priceFeed) {
  priceFeed = _priceFeed;
}
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
address public priceFeed;

constructor(address _priceFeed) {
  priceFeed = _priceFeed;
}
function getETHPrice() public view returns (uint256) {
  AggregatorV3Interface priceFeed = AggregatorV3Interface(priceFeed);
  (, int price, , , ) = priceFeed.latestRoundData();
  return uint256(price);
}

