const diamonds = [];

/*
const diamonds = [
    {
        photo: 'images/diamond1.jpg',
        shape: 'Round',
        carat: 1.2,
        color: 'D',
        cut: 'Excellent',
        clarity: 'VVS1',
        fluorescence: 'None',
        price: 12000,
        discount: 10,
        certificate: 'https://example.com/certificates/diamond1'
    },
    {
        photo: 'images/diamond2.jpg',
        shape: 'Princess',
        carat: 0.9,
        color: 'E',
        cut: 'Very Good',
        clarity: 'VS2',
        fluorescence: 'Faint',
        price: 7500,
        discount: 5,
        certificate: 'https://example.com/certificates/diamond2'
    },
    // ... Add the rest up to 200 objects
];

// Shape images mapping
const shapeImages = {
    'Round': 'images/round.png',
    'Princess': 'images/princess.png',
    'Cushion': 'images/cushion.png',
    'Emerald': 'images/emerald.png',
    'Oval': 'images/oval.png',
    'Radiant': 'images/radiant.png',
    'Asscher': 'images/asscher.png',
    'Marquise': 'images/marquise.png',
    'Heart': 'images/heart.png',
    'Pear': 'images/pear.png'
};
*/



// Generate 500 random diamonds
const shapes = ['Round', 'Princess', 'Cushion', 'Emerald', 'Oval', 'Radiant', 'Asscher', 'Marquise', 'Heart', 'Pear'];
const cuts = ['Ideal', 'Excellent', 'Very Good', 'Good'];
const colors = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
const clarities = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1'];

function randomFloat(min, max, decimals) {
    return (Math.random() * (max - min) + min).toFixed(decimals);
}

function generateDiamonds() {
    for (let i = 0; i < 500; i++) {
        diamonds.push({
            photo: `https://dummyimage.com/60x60/000/fff&text=${i + 1}`,
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            carat: parseFloat(randomFloat(0.5, 10, 2)),
            color: colors[Math.floor(Math.random() * colors.length)],
            cut: cuts[Math.floor(Math.random() * cuts.length)],
            clarity: clarities[Math.floor(Math.random() * cuts.length)],
            fluorescence: Math.random() < 0.5 ? 'None' : 'Medium',
            price: parseFloat(randomFloat(1000, 50000, 2)),
            discount: parseFloat(randomFloat(0, 20, 2)),
            certificate: 'https://example.com/certificate/' + i
        });
    }
}


// Initial carat min and max values
let caratMin = 0;
let caratMax = 10;

function updateCaratRange() {
    caratMin = parseFloat(document.getElementById('carat-min').value);
    caratMax = parseFloat(document.getElementById('carat-max').value);
    filterAndSortDiamonds();
}

function filterAndSortDiamonds() {
    const shapeFilter = document.getElementById('shape-filter').value;
    const cutFilter = document.getElementById('cut-filter').value;
    const clarityFilter = document.getElementById('clarity-filter').value;
    const sortBy = document.getElementById('sort-by').value;

    let filteredDiamonds = diamonds;

    if (shapeFilter !== 'All') {
        filteredDiamonds = filteredDiamonds.filter(d => d.shape === shapeFilter);
    }

    if (cutFilter !== 'All') {
        filteredDiamonds = filteredDiamonds.filter(d => d.cut === cutFilter);
    }

    if (clarityFilter !== 'All') {
        filteredDiamonds = filteredDiamonds.filter(d => d.clarity === clarityFilter);
    }

    // Carat Range Filter
    filteredDiamonds = filteredDiamonds.filter(d => d.carat >= caratMin && d.carat <= caratMax);

    switch (sortBy) {
        case 'carat-high':
            filteredDiamonds = filteredDiamonds.sort((a, b) => b.carat - a.carat);
            break;
        case 'carat-low':
            filteredDiamonds = filteredDiamonds.sort((a, b) => a.carat - b.carat);
            break;
        case 'price-high':
            filteredDiamonds = filteredDiamonds.sort((a, b) => b.price - a.price);
            break;
        case 'price-low':
            filteredDiamonds = filteredDiamonds.sort((a, b) => a.price - b.price);
            break;
    }

    renderTable(filteredDiamonds);
}




// Updated JavaScript function
function renderTable(diamonds) {
    const table = document.getElementById('diamond-table');
    table.innerHTML = '';

    diamonds.forEach(diamond => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><img src="${diamond.photo}" alt="Diamond ${diamond.shape}"></td>
            <td>${diamond.shape}</td>
            <td>${diamond.carat}</td>
            <td>${diamond.color}</td>
            <td>${diamond.cut}</td>
            <td>${diamond.clarity}</td>
            <td>${diamond.fluorescence}</td>
            <td>$${diamond.price.toLocaleString()}</td>
            <td>${diamond.discount}%</td>
            <td><a href="${diamond.certificate}" target="_blank">Verify Certificate</a></td>
        `;

        table.appendChild(row);
    });
}


// Initial generation of diamonds
generateDiamonds();
filterAndSortDiamonds();

// Event listeners for filtering and sorting
document.getElementById('shape-filter').addEventListener('change', filterAndSortDiamonds);
document.getElementById('cut-filter').addEventListener('change', filterAndSortDiamonds);
document.getElementById('clarity-filter').addEventListener('change', filterAndSortDiamonds);
document.getElementById('sort-by').addEventListener('change', filterAndSortDiamonds);
document.getElementById('carat-min').addEventListener('input', updateCaratRange);
document.getElementById('carat-max').addEventListener('input', updateCaratRange);
