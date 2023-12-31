# Function-template
Template for Generative Art Inscriptions on Bitcoin

## Abstract
The Function is a crypto art gallery on Bitcoin Blockchain.
It's focus is on innovative onchain art, that can take the form of runtime art, blockchain art, long form generative, curated generative and more. 

By putting the artist first, The Function operates at the intersection
between art and technology with the idea of empowering creativity.

## General Pointers
- Size matters! Your filesize should be below 20k, preferably below 12k.
- Keep your html file as empty as possible. Through the magic of recursion, this keeps the collector inscription fees to a minimum.
- We currently support p5 and webGL. If you want to use threeJS, there is one inscribed. As are a number of other libraries which you can find here: [https://github.com/jokie88/ordinalpublicgoods?tab=readme-ov-file](https://github.com/jokie88/ordinalpublicgoods?tab=readme-ov-file)

## Project Structure & Recursion
With recursion you can reference any file stored on Bitcoin, simple by referencing /content/<inscriptionId>
And this is how we pull in p5 and the random seed generator.

For a quick start see the boilerplace html file [here]

## Onchain p5.js
To get started with p5, include the onchain library p5.js in your html file, just lije you would include any other script. 

`<script src="https://ordinals.com/content/aacb3ced0a4729740b3bcd7bc787f7d3eb8da7b8d95d6797d8400dc75ec1222ci0"></script>`

***The biggest gotcha is remembering to remove the implicit link of "https://ordinals.com" and make it relative /content/xxxx before you inscribe***

- Soon we will have a tool to auto check your files so you don't make this mistake before you inscribe
- You don't need to use P5, if you're using webGL you can simply skip this

## Random, seeds and CSS 
In order to have a determinstic seed (bascially a PRNG random function) you need to include the following script in your hrml file. 

<script src="https://ordinals.com/content/468ed32abc461867eb94aed96b4cf785bae8704845b00a982607d8f98245d7f6i0"></script>


Out of the box, this gives you:
- a deterministic random function
- your inscription ID
- boilerplace css inserted into your html file to center your canvas
- a second "seeded random function" - that determines it's values directly from the hashed seed
- Global helper variables: M = Math, W = Window, D = Document

## Random

** never use P5's built in random function, this will break determinism of your gen art, which is a bad thing **

There's a few ways to use the random, 

- Use mathRand() to generate deterministic random values between 0, 1

- Use RI(min, max) to generated a random Intiger between min and max

- Use the random class R
  R.D()       :Random Decimal:   output in range 0-1
  R.N(a,b)    :Random Number:    output a float number in the range a to b 
  R.I(a,b)    :Random Intiger:   output a whole number in the range a to b 
  R.B(b)      :Random Boolean:   chance of returning true, where b is a percentage in range 0 to 1

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
/r/blockhash/<HEIGHT>: block hash at given block height.
/r/blockhash: latest block hash.
/r/blockheight: latest block height.
/r/blocktime: UNIX time stamp of latest block.
/r/children/<INSCRIPTION_ID>: the first 100 child inscription ids.
/r/children/<INSCRIPTION_ID>/<PAGE>: the set of 100 child inscription ids on <PAGE>.
/r/metadata/<INSCRIPTION_ID>: JSON string containing the hex-encoded CBOR metadata.
/r/sat/<SAT_NUMBER>: the first 100 inscription ids on a sat.
/r/sat/<SAT_NUMBER>/<PAGE>: the set of 100 inscription ids on <PAGE>.
/r/sat/<SAT_NUMBER>/at/<INDEX>: the inscription id at <INDEX> of all inscriptions on a sat.


##
Have fun. Can't wait to see what you make!

