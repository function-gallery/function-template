# Function-template
Template for Generative Art Inscriptions on Bitcoin


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
- Keep your html file as empty as possible. Through the magic of recursion, this keeps the collector inscription fees to a minimum.
- We currently support p5 and webGL. If you want to use threeJS, there is one inscribed. As are a number of other libraries which you can find here: [https://github.com/jokie88/ordinalpublicgoods?tab=readme-ov-file](https://github.com/jokie88/ordinalpublicgoods?tab=readme-ov-file)
- Minify your code and html using something like [https://codebeautify.org/minify-js]
- Compress your sketch file (more on this below)
- The collector only mints your html file, so try make this as light as possible (under 1k). Our included index.min.html file is 550 bytes, which is just right.  
  
## Project Structure & Recursion

**NB!**
**To make it easy to develop, and for the scripts to run in both locally and in the strict environments of platforms, where you cannot use external urls, you need to add ?dev=1 when developing locally**

-> html file - this gets inscribed by us and sent to the collector on mint
-> p5.js (optional) - this is onchain - include a reference  to it in your html file if needed
-> your_sketch.js - this you need to inscribe and then reference ibn your html file
-> some_other_library_you_want_to_use.js - this you need to inscribe and then reference ibn your html file

For a quick start see the boilerplate html file [[here](https://github.com/function-gallery/function-template/blob/main/index.html)]


With recursion you can reference any file stored on Bitcoin, simple by referencing https://ordinals.com/content/<inscriptionId>

So we have made this much simpler for you. (and saved you some valuable bytes on the process)

## To load any script:
Use: Fn(url, local) to load a script
Use: dFn(url, local) to load a gzipped script

- To test with local files you need to add a second paramater to fN() - fN('my_file.js', 1j
- This is the same as loading the script: `<script src="my_file.js"></script>`
- For onchain versions you don't need the second paramter, eg. Fn('d2a720f067c4811aa66c327d73ae16e0888de2bed77fc086635bcd9f1786159bi0')
- This is the same as loading the script: `<script src="https://ordinals.com/content/d2a720f067c4811aa66c327d73ae16e0888de2bed77fc086635bcd9f1786159bi0"></script>`

Its best to chain these files together so they load in sequence and load dependencies before you run your main script file. 

- A local setup might look like this: Fn('you_p5_file', 1).then(() => Fn('seed.js', 1)).then(() => Fn('sketch.js', 1))
- A production setup would be:

  Fn('d2a720f067c4811aa66c327d73ae16e0888de2bed77fc086635bcd9f1786159bi0') // onchain p5
  .then(() => Fn('769a54f380f3d70bd865fd2b204d8b1502769ea739139978b128cd995208d058i0')) // onchain seed
  .then(() => Fn('my_ordinal_id')) // onchain sketch

While testing you can mix and match, so for example only load your local sketch like so:
  Fn('d2a720f067c4811aa66c327d73ae16e0888de2bed77fc086635bcd9f1786159bi0') // onchain p5
  .then(() => Fn('769a54f380f3d70bd865fd2b204d8b1502769ea739139978b128cd995208d058i0')) // onchain seed
  .then(() => Fn('sketch.js', 1)) // local sktech

  It's best to compress your sketch (but not necessary) if you want to save some $$$ especially if it is larger than 10k. 
  If you want to inscribe and use any external libraries or helper functions best to compress those too. 
  See FFLATE below for more info...

## Onchain p5.js
To get started with p5, include the onchain library p5.js in your html file, simply by using our helper function:
Fn('d2a720f067c4811aa66c327d73ae16e0888de2bed77fc086635bcd9f1786159bi0')

- If you don't need to use P5, or if you're using webGL you can simply skip loading p5

## Seeds and CSS 
In order to have a determinstic seed (bascially a PRNG random function) you need to include the following script in your hrml file. 
Fn('d2a720f067c4811aa66c327d73ae16e0888de2bed77fc086635bcd9f1786159bi0')
which is the same as going: `<script src="https://ordinals.com/content/a2509dacf018fcc6338c0b6b2fa83a24ae8bf227a773972caf5aaf16bed47dbei0"></script>`

Out of the box, this gives you:
- a deterministic random function - R
- global variable 'seed' - which is your inscriptionID, is testing this will be a random seed. 
- boilerplace css inserted into your html file to center your canvas
- A DNA seeder, that mutates the seed as Bitcoin blackhash advances
- A second "long number seeded random function" S() - that determines it's values directly from the hashed seed and can evolve over time with the DNA
- Global helper variables: M = Math, W = Window, D = Document

## CSS 

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

## Random

** never use P5's built in random function, this will break determinism of your gen art, which is a bad thing **

- Use the global random class R
  - R.D()       :Random Decimal:   output in range 0-1
  - R.N(a,b)    :Random Number:    output a float number in the range a to b 
  - R.I(a,b)    :Random Intiger:   output a whole number in the range a to b 
  - R.B(b)      :Random Boolean:   chance of returning true, where b is a percentage in range 0 to 1
  - shorthand even better RN, RD, RI, RB
  - (you can use, for example, RI(max) if you want you min number to be 0), or RD(max) etc.


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
let endpoint_value = await getEndpoint('SOME_INSCRIPTION_ENDPOINT');
eg. let current_blocktime = await getEndpoint('blocktime');

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


## Three.js

A simple boilerplace created by the wizard himself: https://twitter.com/lifofifo
[https://github.com/function-gallery/function-template/blob/main/threejs_boilerplate.html]

** Do not ever use https://ordinals.com in your production version or it will break on various marketplaces **
***The biggest gotcha is remembering to remove the implicit link of "https://ordinals.com" and make it relative /content/xxxx before you inscribe***
** if you move our Fn or dFn methods - no need to worry about this 


##
Thats about it! Have fun. Can't wait to see what you make!

