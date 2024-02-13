# Function-template
Template for Generative Art Inscriptions on Bitcoin


## Abstract
The Function is a crypto art gallery on Bitcoin Blockchain.
It's focus is on innovative onchain art, that can take the form of runtime art, blockchain art, long form generative, curated generative and more. 

By putting the artist first, The Function operates at the intersection
between art and technology with the idea of empowering creativity.

## The jargon can be confusing

- Inscription/Ordinal - an NFT
-  Inscribe - minting
-  Sats - short for Satoshis, the smallest element of a Bitcopin block. Each Sat can hold an NFT (or a number of NFTs stacked ontop of each other in layers)
-  Inscription Number - each new sat inscribed is given a sequential number, starting from 0.
-  Hash/seed/inscriptionID - the blockchain address of your NFT - 64 characters followed by i0. Here's Casey's inscription 0: '6fb976ab49dcec017f1e201e84395983204ae1a7c2abf7ced0a85d692e442799i0'. If you wan to directly view the content of any inscription simply add 'https://ordinals.com/content/' in front of the ID, eg: [https://ordinals.com/content/6fb976ab49dcec017f1e201e84395983204ae1a7c2abf7ced0a85d692e442799i0]

## General Pointers
- Size matters! Your filesize should be below 20k, preferably below 12k.
- Keep your html file as empty as possible. Through the magic of recursion, this keeps the collector inscription fees to a minimum.
- We currently support p5 and webGL. If you want to use threeJS, there is one inscribed. As are a number of other libraries which you can find here: [https://github.com/jokie88/ordinalpublicgoods?tab=readme-ov-file](https://github.com/jokie88/ordinalpublicgoods?tab=readme-ov-file)

## Project Structure & Recursion
With recursion you can reference any file stored on Bitcoin, simple by referencing /content/<inscriptionId>
And this is how we pull in p5 and the random seed generator.

For a quick start see the boilerplate html file [[here](https://github.com/function-gallery/function-template/blob/main/index.html)]

**NB!**
**To make it easy to develop, and for the scripts to run in both locally and in the strict environments of platforms, where you cannot use external urls, you need to add ?dev=1 when developing locally**

## Onchain p5.js
To get started with p5, include the onchain library p5.js in your html file, just lije you would include any other script. 

`<script src="https://ordinals.com/content/303f35721fdc683c2b4d3c505bbcb9144988b20f0af3fe38c8a651dc24cae2f6i0"></script>`


***The biggest gotcha is remembering to remove the implicit link of "https://ordinals.com" and make it relative /content/xxxx before you inscribe***

- Soon we will have a tool to auto check your files so you don't make this mistake before you inscribe
- You don't need to use P5, if you're using webGL you can simply skip this

## Seeds and CSS 
In order to have a determinstic seed (bascially a PRNG random function) you need to include the following script in your hrml file. 

<script src="https://ordinals.com/content/a2509dacf018fcc6338c0b6b2fa83a24ae8bf227a773972caf5aaf16bed47dbei0"></script>


Out of the box, this gives you:
- a deterministic random function
- global variable 'seed' - your inscription ID 
- boilerplace css inserted into your html file to center your canvas
- a second "seeded random function" - that determines it's values directly from the hashed seed
- Global helper variables: M = Math, W = Window, D = Document

The CSS injected is this:

  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    font-family: courier;
  }

  canvas {
    display: block;
  }

  Simply add your own styles on top of these to override anything you don't want or to add other styles. 

## Random

** never use P5's built in random function, this will break determinism of your gen art, which is a bad thing **

There's a few ways to use the random, 

- Use mathRand() to generate deterministic random values between 0, 1

- Use RI(min, max) to generated a random Intiger between min and max

- Use the random class FN
  FN.D()       :Random Decimal:   output in range 0-1
  FN.N(a,b)    :Random Number:    output a float number in the range a to b 
  FN.I(a,b)    :Random Intiger:   output a whole number in the range a to b 
  FN.B(b)      :Random Boolean:   chance of returning true, where b is a percentage in range 0 to 1

- Use seedhash S(n, min, max) - generates an intiger tightly based on the seed, where n can be any number, and the output is an initiger between min and max

## Attributes
To include attributes and rarities in your project, simply add this function:

`window.$functionAttribute = {
 "trait1": "value1",
 "trait2": "value2",
 "trait3": "value3"
}`

## Ordinal endpoints

Endpoints allow you to pull data directly from the chain. The recursive endpoints are:
- /r/blockhash/SOME_HEIGHT: block hash at given block height.
- /r/blockhash: latest block hash.
- /r/blockheight: latest block height.
- /r/blocktime: UNIX time stamp of latest block.
- /r/children/SOME_INSCRIPTION_ID            : the first 100 child inscription ids.
- /r/children/SOME_INSCRIPTION_ID/SOME_PAGE  : the set of 100 child inscription ids of SOME_INSCRIPTION_ID on SOME_PAGE.
- /r/metadata/SOME_INSCRIPTION_ID            : JSON string containing the hex-encoded CBOR metadata.
- /r/sat/SOME_SAT_NUMBER                     : the first 100 inscription ids on a sat.
- /r/sat/SOME_SAT_NUMBER/SOME_PAGE           : the set of 100 inscription ids of SOME_SAT_NUMBER on SOME_PAGE.
- /r/sat/SOME_SAT_NUMBER/at/SOME_INDEX       : the inscription id at SOME_INDEX of all inscriptions on a sat.

## FFLATE

You can compress your script and get get about a 60% saving. We've included FFlate out of the box in the seed file. 
Simply use deflateScript(ordId)

To compress... will ad code later

## Three.js

A simple boilerplace created by the wizard himself: https://twitter.com/lifofifo
[https://github.com/function-gallery/function-template/blob/main/threejs_boilerplate.html]

##
Have fun. Can't wait to see what you make!

