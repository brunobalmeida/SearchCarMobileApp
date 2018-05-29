
function addFriend() {

    //do validation
    if (doValidate_frmAddInfo()) {
        //fetch info from inputs
        var name = $("#txtNameAdd").val();
        var address = $("#txtAddress").val();
        var city = $("#txtCity").val();
        var phoneNumber = $("#txtPhoneNumber").val();
        var email = $("#txtEmail").val();
        var make = $("#txtMake").val();
        var model = $("#txtModel").val();
        var year = $("#txtYear").val();
        var link = "http://www.jdpower.com/cars/" + make + "/" + model + "/" + year;


        //call DAL function to insert the
        var options = [name, address, city, phoneNumber, email, make, model, year, link];

        function callback() {
            console.info("Success: Record inserted successfully");
        }

        Friend.insert(options, callback);
    }
    else {
        console.error("Form is not valid");
    }
}


function clearDatabase() {
    var result = confirm("Really want to clear database?");
    if (result) {
        try {
            DB.dropTables();
            alert("Database cleared!");
        } catch (e) {
            alert(e);
        }
    }
}

function updateFriendEnemy() {
    // var id = $("#txtId").val();
    var id = localStorage.getItem("id");

    var name = $("#txtNameAdd").val();
    var address = $("#txtAddress").val();
    var city = $("#txtCity").val();
    var phoneNumber = $("#txtPhoneNumber").val();
    var email = $("#txtEmail").val();
    var make = $("#txtMake").val();
    var model = $("#txtModel").val();
    var year = $("#txtYear").val();
    var link = "http://www.jdpower.com/cars/" + make + "/" + model + "/" + year;
    var span = '<a href =' + link + '></a>';

    //call DAL function to insert the
    var options = [name, address, city, phoneNumber, email, make, model, year, span, id];

    function callback() {
        console.info("Success: Record updated successfully");
    }

    Friend.update(options, callback);
}

function deleteFriendEnemy() {
    // var id = $("#txtId").val();
    var id = localStorage.getItem("id");
    var options = [id];

    function callback() {
        console.info("Success: Record deleted successfully");
        $(location).prop('href', '#pageFriends');

    }

    Friend.delete(options, callback);
}

function showAllFriendsEnemies() {
    var options = [];


    function callback(tx, results) {

        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {

            // both will work
            // var row = results.rows.item(i);
            var row = results.rows[i];

            var make = row['make'] ;
            var model = row['model'] ;
            var year = row['year'];
            var jdLink = "http://www.jdpower.com/cars/" + make + "/" + model + "/" + year;
            var span = '<a href =' + jdLink + '></a>';

            console.info("Id: " + row['id'] +
                " Name: " + row['name'] +
                " Address: " + row['address'] +
                " City: " + row['city'] +
                " Phone Number: " + row['phoneNumber'] +
                " Email: " + row['email'] +
                " Make: " + row['make'] +
                " Model: " + row['model'] +
                " Year: " + row['year']);

            htmlCode += "<li><a id='test' data-role='button' data-row-id=" + row['id'] +
                " href=' " + jdLink + "'"+
                " target='_blank'>" +
                "<h1>Name: " + row['name'] + "</h1>" +
                "<h3>Address: " + row['address'] + "</h3>" +
                "<h3>City: " + row['city'] + "</h3>" +
                "<h3>Phone Number: " + row['phoneNumber'] + "</h3>" +
                "<h3>Email: " + row['email'] + "</h3>" +
                "<h3>Make: " + row['make'] + "</h3>" +
                "<h3>Model: " + row['model'] + "</h3>" +
                "<h3>Year: " + row['year'] + "</h3>" +
                "<h3>Link: " + row['link'] + "</h3>" +
                "</a></br>" ;

        }




        var lv = $("#lvAll");

        lv = lv.html(htmlCode);
        lv.listview("refresh"); // very important
        //attach event handler for each list items
        $("#lvAll a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));

            //navigate to the detail page automatically
            //both will work.
            $(location).prop('href', '#pageDetail');
            // $.mobile.changePage("#pageDetail", {transition: 'none'});
        }

    }

    Friend.selectAll(options, callback);

}

function showOneFriendEnemy() {


    // var id = $("#txtId").val();
    var id = localStorage.getItem("id");


    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];

        console.info("Id: " + row['id'] +
            " Name: " + row['name'] +
            " Full Name: " + row['fullName'] +
            " DOB: " + row['dob'] +
            " Is Friend: " + row['isFriend']);


        $("#txtNameModify").val(row['name']);
        $("#txtFullNameModify").val(row['fullName']);
        if (row['isFriend'] == 'true') {
            $("#radFriendModify").prop("checked", true);
        }
        else {
            $("#radEnemyModify").prop("checked", true);
        }

        $("#frmModifyFriendEnemy :radio").checkboxradio("refresh");

        $("#txtDOBModify").val(row['dob']);

    }

    Friend.select(options, callback);
}






