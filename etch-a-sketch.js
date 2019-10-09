const gameArea = document.getElementById("gameArea");

const gridButton = document.createElement("button");
gridButton.classList.add("gridButton");
gridButton.textContent = "Start Over";

gameArea.appendChild(gridButton);

gameArea.appendChild(document.createElement('br'));

gridButton.addEventListener('click', StartOver);
window.addEventListener("resize", CalculateGrid);

let gridHeight = 16;
let gridWidth = 16;
let gridArray = [];
CreateGrid();

function CalculateGrid()
{
    console.log(gridArray.length);
    gridArray.forEach(ResizeGrid);
}

function ResizeGrid(item, index)
{
    console.log(index);
    const divWidth = window.innerWidth / (gridWidth * 2);
    item.style.width = divWidth;
    item.style.paddingTop = divWidth;
}
function CreateGrid()
{ 
    let count = 0;

    for(i = 0; i < gridHeight; ++i)
    {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add("rowDiv");
        gameArea.appendChild(rowDiv);

        for(j = 0; j < gridWidth; ++j)
        {
            const gridDiv = document.createElement('div');
            gridDiv.classList.add("generalGrid");
            const divWidth = window.innerWidth / (gridWidth * 2);
            gridDiv.style.width = divWidth;
            gridDiv.style.paddingTop = divWidth;
            rowDiv.appendChild(gridDiv);
            gridArray[count]= gridDiv;

            $(gridDiv).mouseover(function(){
                if(gridDiv.style.backgroundColor === "white")
                {
                    gridDiv.style.backgroundColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
                }
                else
                {
                    gridDiv.style.backgroundColor = GetRGBValues(gridDiv.style.backgroundColor);
                }
                $(gridDiv).addClass('colorStick');
            });

            gridDiv.style.backgroundColor = "white";
            count = count + 1;
        }
        const lineBreak = document.createElement('br');
        gameArea.appendChild(lineBreak);
    }
}

function GetRGBValues(str) {
    var vals = str.substring(str.indexOf('(') +1, str.length -1).split(', ');
    vals[0] = (vals[0] * 0.9);
    vals[1] = (vals[1] * 0.9);
    vals[2] = (vals[2] * 0.9);
    return 'rgb(' + vals[0] + ', ' + vals[1] + ', ' + vals[2] + ' )';
  }

function StartOver()
{
    ChooseGridSize();
}

function ChooseGridSize()
{
    let units = prompt("Create a bigger or smaller grid, type any number under 65?", "16");
   
    if(units === null || units === '')
    {
        return;
    }

    $(".generalGrid").remove();

    gridHeight = Number(units);
    gridWidth = Number(units);

    if(gridHeight > 64)
    {
        gridHeight = 64;
        gridWidth = 64;
    }
    CreateGrid();
}