//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFTs is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 private _totalSupply = 0;

    constructor() public ERC721("MyNFT", "NFT") {}

    struct NftInfo {
        string title;
        string artist;
        string description;
        address issuer;
        string tokenURI;
    }

    NftInfo[] public nftinfo;

    function mintNFT(
        address recipient,
        string memory tokenURI,
        string memory _title,
        string memory _artist,
        string memory _description
    ) public returns (uint256) {
        _tokenIds.increment();
        _totalSupply++;
        nftinfo.push(
            NftInfo(_title, _artist, _description, msg.sender, tokenURI)
        );

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function TotalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function getNftTitle(uint256 tokenId) public view returns (string memory) {
        return nftinfo[tokenId - 1].title;
    }

    function getNftArtist(uint256 tokenId) public view returns (string memory) {
        return nftinfo[tokenId - 1].artist;
    }

    function getDescription(
        uint256 tokenId
    ) public view returns (string memory) {
        return nftinfo[tokenId - 1].description;
    }

    function getIssuer(uint256 tokenId) public view returns (address) {
        return nftinfo[tokenId - 1].issuer;
    }
}
