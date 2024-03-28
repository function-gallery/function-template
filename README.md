# Function-template
Template for Generative Art Inscriptions on Bitcoin

##Quiclinks:
P5.js: [cc5cf94da24c1f6f0d435ccca78c24e98ca30adb1f3b7c81b9ab28ceb6cb628fi0](https://ordinals.com/content/cc5cf94da24c1f6f0d435ccca78c24e98ca30adb1f3b7c81b9ab28ceb6cb628fi0)
FFlate: [f815bd5c566c6e46de5cdb6ccb3a7043c63deeba61f4234baea84b602b0d4440i0](https://ordinals.com/content/f815bd5c566c6e46de5cdb6ccb3a7043c63deeba61f4234baea84b602b0d4440i0)
Seed: [c353b15bc84b178b65b19f16354b7303a8f10dceb85c5545b2173ce0a759059ci0](https://ordinals.com/content/c353b15bc84b178b65b19f16354b7303a8f10dceb85c5545b2173ce0a759059ci0)
ChromaJS: [c49f28a5c9e67efb85d44b9ee12efa2839b0251bad14efc5e6c32406505e259ci0](c49f28a5c9e67efb85d44b9ee12efa2839b0251bad14efc5e6c32406505e259ci0)

- testnet seed b474498d1fab6e07be9543c3bdc8f4403fe871c9750bc887195ca57735c7159bi0
- testnet fflate 657973995aa2a47c3fe02debb22405dadf6b49148d97027627bced89a73f408fi0
- testnet p5 d1fc9ee2d1877927643978045b80078d8e5b2dd49e04d309f5453c8dc4ac269fi0


## Abstract
The Function is the new home for generative and crypto art on Bitcoin.
It's focus is on innovative onchain art, that can take the form of runtime art, blockchain art, long form generative, curated generative and more. 
By putting the artist first, The Function operates at the intersection between art and technology with the idea of empowering creativity.

## The jargon can be confusing

- Inscription/Ordinal - an NFT
-  Inscribe - minting
-  Sats - short for Satoshis, the smallest element of a Bitcopin block. Each Sat can hold an NFT (or a number of NFTs stacked ontop of each other in layers)
-  Inscription Number - each new sat inscribed is given a sequential number, starting from 0.
-  Hash/seed/inscriptionID - the blockchain address of your NFT - 64 characters followed by i0. (This is the same as your transaction ID when you inscribe plus 'i0' at the end.
  Here's Casey's inscription 0: '6fb976ab49dcec017f1e201e84395983204ae1a7c2abf7ced0a85d692e442799i0'.
- If you want to directly view the content of any inscription simply add 'https://ordinals.com/content/' in front of the ID, eg: [https://ordinals.com/content/6fb976ab49dcec017f1e201e84395983204ae1a7c2abf7ced0a85d692e442799i0]

## General Pointers
- Size matters! Your filesize should be below 20k, preferably below 10k. We have some tricks to help you do this. As well as including FFfalt to compress your file by around 60%
- The collector only mints your html file, so try make this as light as possible (under 1k). Our included index.min.html file is 550 bytes, which is just right.  
- Keep your html file as empty as possible. Through the magic of recursion (using ordinals as a filesystem), keeps the collector inscription fees to a minimum.
- We currently support p5 and webGL. If you want to use threeJS, there is one inscribed. As are a number of other libraries which you can find here: [https://github.com/jokie88/ordinalpublicgoods?tab=readme-ov-file](https://github.com/jokie88/ordinalpublicgoods?tab=readme-ov-file)
- Minify your code and html using something like [https://codebeautify.org/minify-js]
- Compress your sketch file using our gzip compress utility (more on this below)

  
## Project Structure & Recursion

With recursion you can reference any file stored on Bitcoin, simple by referencing https://ordinals.com/content/<inscriptionId>

-> html file - this gets inscribed by us and sent to the collector on mint
-> p5.js (optional) - this is onchain - include a reference to it in your html file if needed
-> your_sketch.js - this you need to inscribe and then reference ibn your html file
-> some_other_library_you_want_to_use.js - this you need to inscribe and then reference ibn your html file

For a quick start see the boilerplate html file [[here](https://github.com/function-gallery/function-template/blob/main/index.html)]

**NB! The biggest gotcha**
To make it easy to develop, and for the scripts to run in both locally and in the strict environments of platforms, where you cannot use external urls,
**you need to add ?dev=1 when developing locally**
**Do not ever use https://ordinals.com in your production version or it will break on various marketplaces**
***The biggest gotcha is forgetting to add ?dev=1 to your dev url, which adds the the implicit link of "https://ordinals.com" and makes it relative /content/xxxx when you inscribe***

So we have made this much simpler for you. (and saved you some valuable bytes on the process)

## To load any script:
Use: Fn(url, local) to load a script
Use: dFn(url, local) to load and decompress a gzipped script

- To test with local files you need to add a second paramater to fN() - fN('my_file.js', 1j. This is the same as loading the script: `<script src="my_file.js"></script>`
- For onchain versions you don't need the second paramter, simply use: fN(somneInscriptionID), eg. Fn('d2a720f067c4811aa66c327d73ae16e0888de2bed77fc086635bcd9f1786159bi0') - this is the same as loading the script: `<script src="https://ordinals.com/content/d2a720f067c4811aa66c327d73ae16e0888de2bed77fc086635bcd9f1786159bi0"></script>`

Its best to chain these files together so they load in sequence and load dependencies before you run your main script file. 

- A local setup might look like this: Fn('you_p5_file', 1).then(() => Fn('seed.js', 1)).then(() => Fn('sketch.js', 1))
- or mixing and matching local setup might look like this:
  Fn('769a54f380f3d70bd865fd2b204d8b1502769ea739139978b128cd995208d058i0?p5') // seed with p5
  .then(() => dFn('sketch.js.gzip', 1)) // load and decompress your gzipped script - note the local dFN(xxx **,1**) variable to denote a local file on your hardrive

- A production setup would be:
  Fn('769a54f380f3d70bd865fd2b204d8b1502769ea739139978b128cd995208d058i0?p5')) // onchain seed and p5
  .then(() => Fn('my_ordinal_id')) // onchain sketch

While testing you can mix and match, so for example only load your local sketch like so:
  Fn('d2a720f067c4811aa66c327d73ae16e0888de2bed77fc086635bcd9f1786159bi0') // onchain p5
  .then(() => Fn('769a54f380f3d70bd865fd2b204d8b1502769ea739139978b128cd995208d058i0')) // onchain seed
  .then(() => Fn('sketch.js', 1)) // local sktech

- This may be sound a bit confusing at first, but the best way we've found so far to mix localtions.
- So to recap: ?dev=1 handles url calls to ordinals. if you're testing a script locally on your machine (eg. script.js) then use the local variable - which is specific to each script loaded, meaning you can mix and match scripts, for example call the onchain version of seed.js - Fn('d2a720f067c4811aa66c327d73ae16e0888de2bed77fc086635bcd9f1786159bi0') - while loading a local file eg. script.js Fn('script.js', 1)


It's also best to compress your sketch (but not necessary) if you want to save some $$$ especially if it is larger than 10k. 
If you want to inscribe and use any external libraries or helper functions best to compress those too, and load them with dFN(). 
See FFLATE below for more info...

## Seeds and CSS 

For a determinstic seed (bascially a PRNG random function) you need to include the Function seed script in your hrml file. 
Fn('c353b15bc84b178b65b19f16354b7303a8f10dceb85c5545b2173ce0a759059ci0')
which is the same as going: `<script src="https://ordinals.com/content/c353b15bc84b178b65b19f16354b7303a8f10dceb85c5545b2173ce0a759059ci0"></script>`

Add ?p5 to the url to easily include p5.js in your sketch. 

Out of the box, this gives you:
- a deterministic random function - R
- global variable 'seed' - which is your inscriptionID, is testing this will be a random seed. 
- boilerplace css inserted into your html file to center your canvas
- A DNA seeder, that mutates the seed as Bitcoin blackhash advances
- A second "long number seeded random function" S() - that determines it's values directly from the hashed seed and can evolve over time with the DNA
- Global helper variables: M = Math, W = Window, D = Document, RO = Math.round
- Behind the scenes handling of urls

## Random

- Use the global random class R for deterministic random values
  - RD()       :Random Decimal:   output in range 0-1
  - RN(a,b)    :Random Number:    output a float number in the range a to b 
  - RI(a,b)    :Random Intiger:   output a whole number in the range a to b 
  - RB(b)      :Random Boolean:   chance of returning true, where b is a percentage in range 0 to 1
  - You can also use, RI(max), RD(max) etc. if you want you minimum number to be 0

**DO NOT use Math.random() or P5's built in random function. And probsbly don't use randomSeed(RI(some_high_number)**

### Onchain p5.js
To get started with p5, include the onchain library p5.js in your html file, simply add ?p5 when loading the seed:
Fn('471498e981ff7bdf0448fd15d5bd428cece8597a177322f8748169debd35bc6di0')

- Current version is p5.js 1.9.0
- remember for your local development to add ?dev=1 to your browser url
- If you don't need to use P5, or if you're using webGL you can simply skip loading p5

### CSS 

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

  This CSS willl be good for 99% of all uses cases. However, if you want to add other styles simply add them on top of these in your html file. 



## Long number seed hash and DNA

- Use long number seedhash S(n, min, max) as an alternative to R
- S(n, min, max) generates an intiger tightly based on the seed, where n can be any number (its actually a pointer on the long number), and the output is an initiger between min and max

- DNA - is an easy solution to create runtime gen art - forever evolving as the blockchain evolves.
- Call getDNA() to fire it up and it will repeatedly call the blockchain every 5 mins (blocks usually take around 10 mins, so no ned to overdo it).
- This will give you an ever changing global variable `dna`.
- Use S(n, min, max) not RI() etc. as your random generator and your art will automagically evolve. 

## Binary

You also get a global 'bin' variable with is a binary representation of your seed.
- you can also use the function BIN(s) to turn any string into a binary string
- you can then traverse the binary string using isBin(n) to check whether a point along the binary string is 0 or 1 (true or false)

## Attributes/Rarity
To include attributes and rarities in your project, simply add this function:

`window.$functionAttribute = {
 "trait1": "value1",
 "trait2": "value2",
 "trait3": "value3"
}`


## Ordinal endpoints

We've made it easy to call endpoints: 
getEndpoint('SOME_INSCRIPTION_ENDPOINT').then(d => endpoint_value = d);
eg. getEndpoint('blocktime').then(d => current_blocktime = d)

Endpoints allow you to pull data directly from the chain. The recursive endpoints avaialble are:
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

To compress simple run the compress.js file in this directory like so:
run node compress <filename>

Depending on your local server setup, you might need to first install fflate and fs
npm install fflate
npm install fs

Once you've inscribed your file use:
dFn(ordId) to load in an onchain gzipped script, or
dFn('my_local_script.js', 1) to test a local compressed script


## TESTNET

You can now test your files on Bitcoin testnet. You can get testnet BTC here: [https://bitcoinfaucet.uo1.net/](https://bitcoinfaucet.uo1.net/)

Easiest way to inscribe on the testnet is [https://testnet.unisat.io/inscribe](https://testnet.unisat.io/inscribe)

Simply add ?&test=1 to your url to switch to testnet urls
See index_testnet.html for example

- testnet seed
  b474498d1fab6e07be9543c3bdc8f4403fe871c9750bc887195ca57735c7159bi0
- testnet fflate
  657973995aa2a47c3fe02debb22405dadf6b49148d97027627bced89a73f408fi0
- testnet p5
  d1fc9ee2d1877927643978045b80078d8e5b2dd49e04d309f5453c8dc4ac269fi0



## Three.js

A simple boilerplace created by the wizard himself: [https://twitter.com/lifofifo](https://twitter.com/lifofifo)
[https://github.com/function-gallery/function-template/blob/main/threejs_boilerplate.html]


##
Thats about it! Have fun. Can't wait to see what you make!

