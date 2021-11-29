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
let i = 0, k = 0;

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

if (k == 1){
	tree[0].code = '0';
}

let mar = 0, min_freq1 = 0, min_freq2 = 0;
while (mar < k-1){
	let t1 = inputData.length;
	let t2 = inputData.length;
	for (i = 0; i < tree.length; i++){
		if(tree[i].freq <= t1 && tree[i].used == false){
			t1 = tree[i].freq
			min_freq1 = i;
		}
	}
	tree[min_freq1].used = true;
	for(i = 0; i < tree.length; i++){
		if(tree[i].freq <= t2 && tree[i].used == false){
			t2 = tree[i].freq;
			min_freq2 = i;
		}
	}
	tree[min_freq2].used = true; 
	n = new Node(tree[min_freq1].letter + tree[min_freq2].letter, tree[min_freq1].freq + tree[min_freq2].freq, false, null, '');
	tree.push(n);
	fat.push(n);
	tree[min_freq1].father = tree[min_freq1].letter + tree[min_freq2].letter;
	tree[min_freq2].father = tree[min_freq1].letter + tree[min_freq2].letter;
	mar++;
}


for (cou1 = tree.length-1; cou1 != -1; cou1--){
	for(leftBranch = tree.length-1; leftBranch != -1; leftBranch--){
		for(rightBranch = tree.length-1; rightBranch != -1; rightBranch--){
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
	
	
	
	


