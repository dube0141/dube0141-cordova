var myList = [];

document.addEventListener("DOMContentLoaded", function (ev) {
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    if (localStorage.getItem("grocery-dube0141")) {
        myList = JSON.parse(localStorage.getItem("grocery-dube0141"));
    }
    showList();
    clear();

    document.querySelector(".add").addEventListener("click", function (ev) {
        ev.preventDefault();
        var newItem = document.querySelector("#item").value;
        if (newItem == "") {
            alert("Don't forget to type something in!");
        } else {
            document.querySelector("#tip").style.display = "none";
            myList.push(newItem);
            localStorage.setItem("grocery-dube0141", JSON.stringify(myList));
            var checkbox = '<label><input type="checkbox" />' + newItem + '</label>';
            $('#group').append(checkbox);
            $('[type=checkbox]').checkboxradio().trigger('create');
            $('#group').controlgroup().trigger('create');
            document.querySelector("form").onclick = this.form.reset();
            console.log(localStorage);
            removeItem();
        }
    });
    return false;
});

function clear() {
    document.querySelector("#clear").addEventListener("click", function () {
        localStorage.removeItem("grocery-dube0141");
        location.reload();
    });
}

function removeItem() {
    $(".ui-checkbox").on('taphold', $(this), function () {
        this.parentNode.removeChild(this);
        var group = document.querySelector("#group");
        var box = document.querySelector(".ui-checkbox");
        var label = $(this).find('label');
        label = label[0].innerHTML;
        for (var i = 0; i < myList.length; i++) {
            if (myList[i] == label) {
                myList.splice(i, 1);
                localStorage.setItem("grocery-dube0141", JSON.stringify(myList));
                console.log("LOCAL STORAGE: " + localStorage.getItem("grocery-dube0141"));
            }
        }
        group.insertBefore(box, group.firstChild);
    });

}

function showList() {
    for (var i = 0; i < myList.length; i++) {
        var checkbox = '<label><input type="checkbox" />' + myList[i] + '</label>';
        $('#group').append(checkbox);
        $('[type=checkbox]').checkboxradio().trigger('create');
        $('#group').controlgroup().trigger('create');
        removeItem();
    }

}