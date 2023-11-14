# Function-template
Template for Generative Art Inscriptions on Bitcoin

## Abstract
The Function is a generative art gallery on Bitcoin Blockchain.
It's focus is on long form art projects based on code which 
generate multiple visual outputs. 

By putting the artist first, The Function operates at the intersection
between art and technology with the idea of empowering creativity 
by creating value on an immutable medium.

## Template
The template is an HTML page storing JS functions enabling an artwork
to generate variations based on each unique transaction identifiers (hash).

## Recursion p5.js
include the library p5.js

`<script src="https://ordinals.com/content/aacb3ced0a4729740b3bcd7bc787f7d3eb8da7b8d95d6797d8400dc75ec1222ci0"></script>`

## Random prng
Use mathRand() to generate deterministic random values

`Math.random() => mathRand()`

## Dynamic attributes
Include in your code attributes (metadata)

`window.$functionAttribute = {
 "trait1": "value1",
 "trait2": "value2",
 "trait3": "value3"
}`
