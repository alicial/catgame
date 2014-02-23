(function($) {
    var board;
    var cats = [];
    var elemTypes = ['toy', 'food', 'water', 'litter'];
    var feelings = ['bored', 'hungry', 'thirsty', 'dirty', 'content'];
    var activeElem;

    var randElem = function(arr) {
        return arr[Math.floor(Math.random()*arr.length)];
    };

    var Cat = function(index) {
        var _cat = {
            div: $("<div class='tile cat'></div>").css("left", board.width()*index/4),
            state: randElem(feelings)
        };
        _cat.otherStates = function() {
            return $.grep(feelings, function (f) { return f != _cat.state });
        }
        _cat.div.click(function() {
            if ((_cat.state == 'bored' && activeElem.type == 'toy')
                || (_cat.state == 'hungry' && activeElem.type == 'food')
                || (_cat.state == 'thirsty' && activeElem.type == 'water')
                || (_cat.state == 'dirty' && activeElem.type == 'litter')) {
                _cat.changeState(randElem(_cat.otherStates()));
            } else if (_cat.state == 'happy'){
            } else if (_cat.state == 'angry'){
            } else if (_cat.state == 'content' && activeElem.type == randElem(elemTypes)){
                _cat.changeState('happy');
                var happy = true;
                for (var i=0; i<cats.length;i++) {
                    if (cats[i].state != 'happy') {
                        happy = false;
                    }
                }
                if (happy) {
                    alert("YOU WIN!! YOU'RE THE BEST CAT LADY!");
                }
            } else {
                _cat.changeState('angry');
                setTimeout(function() {
                    _cat.changeState(randElem(feelings));
                }, 10000);
            }
            activeElem.changeType();
        });
        _cat.changeState = function(newState) {
            if(_cat.state != newState) {
                console.log("Changed from " + _cat.state + ' to ' + newState);

                _cat.div.removeClass(_cat.state).addClass(newState);
                _cat.state = newState;
            }
        };
        _cat.div.addClass(_cat.state);
        return _cat;
    };

    var Elem = function() {
        var type = randElem(elemTypes);
        var _elem = {
            div: $("<div class='tile elem active'></div>"),
            type: type
        };
        _elem.div.addClass(_elem.type);
        _elem.otherTypes = function() {
            return $.grep(elemTypes, function (f) { return f != _elem.type });
        }
        _elem.changeType = function() {
            _elem.div.removeClass(_elem.type);
            _elem.type = randElem(_elem.otherTypes());
            _elem.div.addClass(_elem.type);
        };
        _elem.div.click(function() {
            _elem.changeType();
        });
        return _elem;
    };

    var setupBoard = function() {
        board = $(".board");
    };

    var addCat = function(index) {
        cats[index] = Cat(index);
        board.append(cats[index].div);
    };

    var addElem = function() {
        activeElem = Elem();
        board.prepend(activeElem.div);
    };

    $(document).ready(function() {
        setupBoard();
        for (var i=0; i<4; i++) {
            addCat(i);
        }
        addElem();
    });

})(jQuery);

