import igv, { ReferenceGenome } from 'igv/dist/igv.esm.js';


function mkDiv(heading: string) {
    const h1 = document.createElement('h1');
    h1.textContent = heading;
    document.body.appendChild(h1);
    const div = document.createElement('div');
    document.body.appendChild(div);
    return div;
}

// Object literal may only specify known properties, and 'oops' does not exist in type 'CreateOpt'.ts(2353)
// @ts-expect-error
igv.createBrowser(mkDiv("No Genome"), { oops: 'oops' });

// Type 'number' is not assignable to type 'string'.ts(2322)
// @ts-expect-error
igv.createBrowser(mkDiv("Wrong Genome type"), { genome: 42 });

// ===========  Exactly one of genome or reference required ===========

// Correct
igv.createBrowser(mkDiv("Genome via 'genome'"), { genome: 'hg19' });

// https://github.com/igvteam/igv.js/blob/master/test/data/genomes/altGenomes.json
// Explicitly declare type to assert that it is correct
const refGenome: ReferenceGenome = {
    id: "_dm6",
    name: "D. melanogaster (dm6)",
    fastaURL: 'https://s3.dualstack.us-east-1.amazonaws.com/igv.broadinstitute.org/genomes/seq/dm6/dm6.fa',
    indexURL: 'https://s3.dualstack.us-east-1.amazonaws.com/igv.broadinstitute.org/genomes/seq/dm6/dm6.fa.fai',
    cytobandURL: "https://s3.dualstack.us-east-1.amazonaws.com/igv.org.genomes/dm6/cytoBandIdeo.txt.gz",
};

// Also correct
igv.createBrowser(mkDiv("Genome via 'reference'"), { reference: refGenome });

/*
Argument of type '{ genome: string; reference: { fastaURL: string; }; }' is not assignable to parameter of type 'CreateOpt'.
  Type '{ genome: string; reference: { fastaURL: string; }; }' is not assignable to type 'ReferenceFrag & CreateOptExtras'.
    Type '{ genome: string; reference: { fastaURL: string; }; }' is not assignable to type 'ReferenceFrag'.
      Types of property 'genome' are incompatible.
        Type 'string' is not assignable to type 'never'.ts(2345)
*/
// @ts-expect-error
igv.createBrowser(mkDiv("Conflicting 'genome' & 'reference'"), { genome: 'dm6', reference: refGenome });

// ===========  /  ===========

// ===========  Extra keys ===========

/*
Typescript is smart so it will not allow you to add extra keys to an object literal that is being passed directly as an interface.
However, if you start with a correct object, even if it has extra keys, TS will accept it as the interface type.
*/

// Object literal may only specify known properties, and 'idontcare' does not exist in type 'CreateOpt'.ts(2353)
// @ts-expect-error
igv.createBrowser(mkDiv("Extra config keys - literal"), { genome: 'hg19', idontcare: 'idontcare' });

// However if you start with a correct object, you can have extra keys
const cOptWithExtraKey = { genome: 'hg19', idontcare: 'idontcare' };

// Correct
igv.createBrowser(mkDiv("Extra config keys - casted"), cOptWithExtraKey);

// ===========  /  ===========

// ==========  Browser Class  ==========

~async function () {
    const browser = await igv.createBrowser(mkDiv("Using Browser API"), { genome: 'hg19' });

    // Property 'oops' does not exist on type 'Browser'.ts(2339)
    // @ts-expect-error
    browser.oops = 'oops';

    // Correct
    browser.toSVG();

    // Expected 0 arguments, but got 1.ts(2554)
    // @ts-expect-error
    browser.toSVG("is there an argument here?");

    // ===========  /  ===========
}();