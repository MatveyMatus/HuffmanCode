let inputData;
let arg = process.argv;
function Node(letter,freq, used, father, code){
	this.letter = letter;
	this.freq = freq;
	this.used = used;
	this.father = father;
	this.code = code;
}
let fs = require('fs');
let fat = new Array();
let alph = new Array();
let tree = new Array();
let i = 0, k = 0, marker = 1;

inputData = fs.readFileSync(arg[2]);
inputData = inputData.toString();
for (i = 0; i < inputData.length; i++){
	alph[inputData.charAt(i)] = 0;
}

for (i= 0; i < inputData.length; i++){
	alph[inputData.charAt(i)]++;
}

for(i in alph){
	let n = new Node(i, alph[i], false, null, '');
	tree.push(n);
	k++;
}

let mar = 0;
while (mar < k-1){
	for(let t = 0; t < 2; t++){  
		tree.sort(function(a,b) {
			if (a.freq < b.freq)
				return -1;
			if (a.freq > b.freq) 
				return 1;
			if (a.freq == b.freq)
				if (a.letter > b.letter)
					return -1
				if (a.letter < b.letter)
					return 1
			return 0;
		});
		if (tree[marker-1].used == false && tree[marker].used == false){
			n = new Node(tree[marker-1].letter + tree[marker].letter, tree[marker-1].freq + tree[marker].freq, false, null, '');
			tree.push(n);
			fat.push(n);
			tree[marker-1].father = tree[marker-1].letter + tree[marker].letter;
			tree[marker].father = tree[marker-1].letter + tree[marker].letter;
			tree[marker-1].used = true;
			tree[marker].used = true;
			
		}
		marker++;
	}
	mar++;
}

tree.sort(function(a,b){
	if (a.freq < b.freq)
		return 1;
	if (a.freq > b.freq) 
		return -1;
	return 0;
});


for (cou1 = 0; cou1 < tree.length; cou1++){
	for(leftBranch = 0; leftBranch < tree.length; leftBranch++){
		for(rightBranch = 0; rightBranch < tree.length; rightBranch++){
			if ((tree[cou1].letter == tree[leftBranch].father) && (tree[cou1].letter == tree[rightBranch].father) && (leftBranch != rightBranch)){
				tree[leftBranch].code = tree[cou1].code + '0';
				tree[rightBranch].code = tree[cou1].code + '1';
			}
		}
	}
}

for (j = 0; j < tree.length; j++){
	if (tree[j].letter.length > 1)
		tree = tree.filter(num => num.letter.length == 1);
}	

tree.sort(function(a,b){
	if (a.father.length < b.father.length)
		return 1;
	if (a.father.length > b.father.length) 
		return -1;
	return 0;
});
console.log(tree);

let enStr = '';
for (q = 0; q < inputData.length; q++){
	for (x = 0; x < tree.length; x++){
		if (inputData.charAt(q) == tree[x].letter)
			enStr += tree[x].code;
	}
}
console.log('codedData:',enStr);
//fs.writeFileSync(arg[3],enStr);
	
let codH = enStr;
let medStr = '';
enStr = '';
for (q = 0; q < codH.length; q++){
	medStr += codH.charAt(q);
	for (x = 0; x < tree.length; x++){
		if (medStr == tree[x].code){
			enStr += tree[x].letter;
			medStr = '';
		}
	}
}
console.log('decodedData:',enStr);
//fs.writeFileSync(arg[4],enStr);
	
	
	
	


