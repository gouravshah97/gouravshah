(function() {
  var app = $('#app')[0];
  var typewriter = new Typewriter(app, {
    loop: true,
    delay: 75,
  });

  typewriter
    .pauseFor(1500)
    .typeString('A <span class="color-text">Dedicated</span> Developer.')
    .pauseFor(700)
    .deleteChars(20)
    .typeString(' <span class="color-text">Code</span> Lover ! !')
    .pauseFor(700)
    .deleteChars(16)
    .typeString('n <span class="color-text">Enthusiastic</span> Learner.')
    .pauseFor(700)
    .start();

  var displaySelectedDiv = function(target) {
    var divs = ['home', 'about-me', 'resume', 'my-works', 'certificates'];

    var length = divs.length;
    if (target.trim() === 'home') {
      $('.navbar-custom').css('display', 'none');
    } else {
      $('.navbar-custom').css('display', 'block');
    }
    for (var i = 0; i < length; i++) {

      var activateNavItem = '#' + divs[i];
      var activateDiv = '.' + divs[i] + '-container';
      if (divs[i] === target.trim()) {
        $(activateNavItem).addClass('active-div');
        $(activateDiv).css('display', 'block');
      } else {
        $(activateNavItem).removeClass('active-div');
        $(activateDiv).css('display', 'none');
      }


    }
  }


  $('#more-about-me').click(function() {
    displaySelectedDiv('about-me');
  });

  $('#about-me').click(function() {
    displaySelectedDiv('about-me');
  });

  $('#home').click(function() {
    displaySelectedDiv('home');
  });

  $('#resume').click(function() {
    displaySelectedDiv('resume');
  });

  $('#my-works').click(function() {
    displaySelectedDiv('my-works');
  });

  $('#certificates').click(function() {
    displaySelectedDiv('certificates');
  });



  var temp = '';

  $('.skills-icon').hover(function(e) {
    var skill = e.target.closest('.skills-icon');
    var skillName = ($(this).children(skill)[1]);

    if(skillName.textContent==='HTML'){
      temp='HTML';
      skillName.textContent='95%';
    }
    else if (skillName.textContent==='CSS') {
      temp='CSS';
      skillName.textContent='85%';
    }
    else if (skillName.textContent==='BOOTSTRAP') {
      temp='BOOTSTRAP';
      skillName.textContent='80%';
    }
    else if (skillName.textContent==='NODE') {
      temp='NODE';
      skillName.textContent='60%';
    }
    else if (skillName.textContent==='JAVASCRIPT') {
      temp='JAVASCRIPT';
      skillName.textContent='75%';
    }
    else if (skillName.textContent==='REACT') {
      temp='REACT';
      skillName.textContent='60%';
    }
    else if (skillName.textContent==='JAVA') {
      temp='JAVA';
      skillName.textContent='70%';
    }
    else if (skillName.textContent==='SQL, PL/SQL') {
      temp='SQL, PL/SQL';
      skillName.textContent='60%';
    }
    else if (skillName.textContent==='PYTHON') {
      temp='PYTHON';
      skillName.textContent='50%';
    }
    else if (skillName.textContent==='JQUERY') {
      temp='JQUERY';
      skillName.textContent='70%';
    }
    else if (skillName.textContent==='SPRING FRAMEWORK') {
      temp='SPRING FRAMEWORK';
      skillName.textContent='50%';
    }



  },function(e) {
    var skill = e.target.closest('.skills-icon');
    var skillName = ($(this).children(skill)[1]);

    if(temp==='HTML'){
      temp='';
      skillName.textContent='HTML';
    }
    else if (temp==='CSS') {
      temp='';
      skillName.textContent='CSS';
    }
    else if (skillName.textContent==='BOOTSTRAP') {
      temp='';
      skillName.textContent='BOOTSTRAP';
    }
    else if (temp==='NODE') {
      temp='';
      skillName.textContent='NODE';
    }
    else if (temp==='JAVASCRIPT') {
      temp='';
      skillName.textContent='JAVASCRIPT';
    }
    else if (temp==='REACT') {
      temp='';
      skillName.textContent='REACT';
    }
    else if (temp==='JAVA') {
      temp='';
      skillName.textContent='JAVA';
    }
    else if (temp==='SQL, PL/SQL') {
      temp='';
      skillName.textContent='SQL, PL/SQL';
    }
    else if (temp==='PYTHON') {
      temp='';
      skillName.textContent='PYTHON';
    }
    else if (temp==='JQUERY') {
      temp='';
      skillName.textContent='JQUERY';
    }
    else if (temp==='SPRING FRAMEWORK') {
      temp='';
      skillName.textContent='SPRING FRAMEWORK';
    }



  });




})();
