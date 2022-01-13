var budgetController=(function () {

	var Income=function(id,description,value)
	{
		this.id=id;
		this.description=description;
		this.value=value;
		this.percentage=-1;
	};
	var Expense=function(id,description,value)
	{
		this.id=id;
		this.description=description;
		this.value=value;
	};



	Expense.prototype.calculateIndividualPercentage=function(totalIncome){
		
		if(totalIncome>0)
		{
			this.percentage=Math.round((this.value/totalIncome)*100);
		}
		else
		{
			this.percentage=-1;
		}
	}

	

	var data={

		items:{
			inc:[],
			exp:[]
		},

		total:{
			exp:0,
			inc:0
		},

	
			savings:0,
			percentage:-1
		
	};

	var calculateBudget= function()
   			{

   				var sumInc=0,sumExp=0;

   				
   				data.items.inc.forEach(function(current,index,array){

   					sumInc=sumInc+current.value;
   					//console.log(current,index,array);

   				});

   				data.items.exp.forEach(function(current,index,array){
   					sumExp=sumExp+current.value;
   					//		console.log(current,index,array);

   				});

   				data.total.inc=sumInc;
   				data.total.exp=sumExp;
   				data.savings=data.total.inc-data.total.exp;

   				if(data.total.inc>0)
   				{
   					data.percentage= Math.round((data.total.exp/data.total.inc)*100);
   				}
   				else
   				{
   					data.percentage=-1;
   				}



   				console.log(data.savings,data.percentage);

   			};


   		


	return {

   			addItem: function(type,description,value){

   				var newItem,id;
   				if(data.items[type].length>0)
   				{
   					id= data.items[type][data.items[type].length-1].id+1;
   				}
   				else
   				{
   					id=0;
   				}

   				if(type==='inc')
   				{
   					newItem= new Income(id,description,value);


   				}
   				else
   				{
   					newItem= new Expense(id,description,value);

   				}

   				data.items[type].push(newItem);

   				return newItem;
   			},

   			deleteItem: function(type,id)
   			{
   				var ids,index;


   				ids=data.items[type].map(function(current)
   				{
   					return current.id;

   				 
   				});

   				index=ids.indexOf(id);

   				
   				if(index !==-1)
   				{
   					
   					data.items[type].splice(index,1);
   				}

   				

   			},

   			calculateIndividualPercentage: function(){

   				var individualExpensePercentageList=data.items.exp.map(function(current){

   					current.calculateIndividualPercentage(data.total.inc);
   					return current.percentage;
   				})

   				return individualExpensePercentageList;

   			},

   		    getBudget: function()
   		       {

   		       	 calculateBudget();

   		       	 var bugdet={

   		       	 	savings: data.savings,
   		       	 	percentage: data.percentage,
   		       	 	income: data.total.inc,
   		       	 	expense: data.total.exp
   		       	 };


   		       	 return bugdet;


   		       }

   		

	}

})();




var UIController=(function () {

	var ClassNames={

		addButton: '.add__btn',
		addDescription: '.add__description',
		addValue: '.add__value',
		addType: '.add__type',
		incomeList: '.income__list',
		expenseList: '.expenses__list',
		budgetValue:'.budget__value',
		income:'.budget__income--value',
		expense:'.budget__expenses--value',
		percentageOverall:'.budget__expenses--percentage',
		parent:'.container',
		itemPercentage: '.item__percentage',
		month: '.budget__title--month'

	}


	var format=function(num,type)
	{
		var int,dec;

		num=Math.abs(num);
		num=num.toFixed(2);
		num=num.split('.');
		int=num[0];
		dec=num[1];

		if(int.length>3)
		{
			int=int.substr(0,int.length-3)+','+int.substr(int.length-3,3);
		}

		return(type==='+'?'+':'-')+' '+int+'.'+dec;


	}
	return{



			  changeFocus: function()
			  {

			  
			  	var fields=document.querySelectorAll(ClassNames.addDescription+','+ClassNames.addType+','+ClassNames.addValue);

			    var fieldArray=Array.prototype.slice.call(fields);

			    fieldArray.forEach(function(current)
			    {
			    	
			    	current.classList.toggle('red-focus');

			    })

			    document.querySelector(ClassNames.addButton).classList.toggle('red');

			  },

			  getData: function(){

			  	var data={
			  			description: document.querySelector(ClassNames.addDescription).value,
			  			type: document.querySelector(ClassNames.addType).value,
			  			value: parseFloat(document.querySelector(ClassNames.addValue).value)
			  		      };


			  		      return data;

			  },

		     getUIClassNames: function(){

		     	return ClassNames;
		     },


		     addItemToUI: function(type,object)
		     {
		     	var html;

		     	if (type==='inc')
		     	{

		     		html='<div class="item clearfix" id="inc-'+object.id+'"><div class="item__description">'+object.description+'</div><div class="right clearfix"><div class="item__value">'+format(object.value,'+')+'</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
		     		document.querySelector(ClassNames.incomeList).insertAdjacentHTML('beforeEnd',html);

		     	}
		     	else
		     	{

		     		html='<div class="item clearfix" id="exp-'+object.id+'"><div class="item__description">'+object.description+'</div><div class="right clearfix"><div class="item__value">'+format(object.value,'-')+'</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
		     		document.querySelector(ClassNames.expenseList).insertAdjacentHTML('beforeEnd',html);



		     	}

		     },

		     deleteItemFromUI: function(id)

		     {

		     	var element=document.getElementById(id);
		     	element.parentNode.removeChild(element);

		     },

		     clearFields: function()
	     		{
	      	           fields=document.querySelectorAll(ClassNames.addDescription+','+ClassNames.addValue);
	      		        //console.log(fields);
	      	           fieldArray=Array.prototype.slice.call(fields);
	      	          	//console.log(fieldArray);

	      			   fieldArray.forEach(function(current,index,array)
	      				{

	      					current.value="";
	      					//console.log(current);
	      				})
	           	     fieldArray[0].focus();
	             },


	          updateIndividualPercentage:function(percentageList)
	          {
	          	var arr=Array.prototype.slice.call(document.querySelectorAll(ClassNames.itemPercentage));

	          	arr.forEach(function(current,index)
	          	{
	          		if(percentageList[index]>0){
	          		current.textContent=percentageList[index]+'%';}
	          		else{
	          			current.textContent='--';
	          		}
	          	})
	          	
	          },

	          date:function()
	          {
	          	var now=new Date();

	          	var monthArray=['January','February','March','April','May','June','July','August','Septemeber','October','November','December'];
	          	var month=monthArray[now.getMonth()];

	          	var year=now.getFullYear();
	          	document.querySelector(ClassNames.month).textContent=month + ' '+ year;

	          },

	         displayBudget:function(object)
	         {
	         	var type;

	         	if(object.savings>=0)
	         	{
	         		type='+';
	         	}
	         	else
	         	{
	         		type='-';
	         	}

	         	document.querySelector(ClassNames.budgetValue).textContent=format(object.savings,type);
	         	document.querySelector(ClassNames.income).textContent=format(object.income,'+');
	         	document.querySelector(ClassNames.expense).textContent=format(object.expense,'-');

	        	if(object.percentage>0){
	         	document.querySelector(ClassNames.percentageOverall).textContent=object.percentage+'%';
	         }

	         else
	         {
	         	document.querySelector(ClassNames.percentageOverall).textContent='--';
	         }




	         }


	      };


	
	
})();






var appController=(function (budgetControl,UIControl) {
	

    var UIClassNames=UIController.getUIClassNames();
   

   
   
    	

    var setUpEventListeners=  function()
    {

    		document.querySelector(UIClassNames.addButton).addEventListener('click',ctrlAddItems);

	        document.addEventListener('keypress',function(event){

		   if(event.keyCode ===13 || event.which ===13)
		     {
			   ctrlAddItems();
		     }

		     document.querySelector(UIClassNames.parent).addEventListener('click',deleteItems);

		     

	})

	        document.querySelector(UIClassNames.addType).addEventListener('change',UIController.changeFocus);


    };


    var updateIndividualPercentage=function()
    {
    	var percentageArray=budgetController.calculateIndividualPercentage();
    	UIController.updateIndividualPercentage(percentageArray);

    };


    var updateBudget=function(){


    	var budget=budgetController.getBudget();

    	UIController.displayBudget(budget);

    };
    

    var ctrlAddItems=function()
    {

    	var itemDetails=(UIController.getData());

    	if(itemDetails.description!=="" && itemDetails.value>0 && !isNaN(itemDetails.value)){

    	var newItem=budgetController.addItem(itemDetails.type,itemDetails.description,itemDetails.value);

    	UIController.addItemToUI(itemDetails.type,newItem);

    	UIController.clearFields();

    	updateBudget();

    	updateIndividualPercentage();

    }
   
    };

    var deleteItems=function(event)
    {
    	var idName,id,type,sp;
    	console.log(event.target);
    	console.log(event.target.parentNode);
    	console.log(event.target.parentNode.parentNode);
    	console.log(event.target.parentNode.parentNode.parentNode);
    	console.log(event.target.parentNode.parentNode.parentNode.parentNode);
    	idName= event.target.parentNode.parentNode.parentNode.parentNode.id;
    	console.log(idName);

    	if(idName){
    	sp=idName.split('-');
    	id=parseInt(sp[1]);
    	type=sp[0];

    	
    	budgetController.deleteItem(type,id);
    	UIController.deleteItemFromUI(idName);
    	updateBudget();
    	updateIndividualPercentage();
    }

    }

    

   return{

		     init: function(){

		     	console.log("Started");
		     	setUpEventListeners();   

		     	UIController.displayBudget({
		     		savings: 0.00,
   		       	 	percentage: 0,
   		       	 	income: 0,
   		       	 	expense: 0
		     	});

		     	UIController.date();




	     }





	      }


})(budgetController,UIController);



appController.init();
