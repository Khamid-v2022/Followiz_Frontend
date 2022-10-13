/******************************** Code to get user location *************************/
const currentURL = window.location.href;
const homeURL =  location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')+'/';


/**************** Toggle Menu open menu after redirect page  *****************/
    $(document).ready(function(){  
        $('.nav .ticketList').click(function(){
            $('.ticketList').removeClass("active");
            $(this).addClass("active");
        });

        $('.navbar-nav li').each(function(){
            if($(this).hasClass('active')) {
                $(this).parent().parent().toggleClass("open-menu");
            } 
        });
        $('.user-dropdown li').each(function(){
            if($(this).hasClass('active')) {
                $(this).parent().parent().toggleClass("open-menu");
            }
        });

        var checkThemeMode = localStorage.getItem("theme_layout");
        if (checkThemeMode != "") { 
            if(checkThemeMode == "theme-dark"){
                $("#themeMode").prop("checked",true); 
                $(".label-success").html("Light Mode");
            } 	
        } 

        $("#themeMode").on('change',function(){
            if($(this).prop("checked") == true){
                localStorage.setItem('theme_layout', "theme-dark");
                $('body').removeClass().addClass('theme-dark');
                $(".label-success").html("Light Mode");
            
            }else{
                localStorage.setItem('theme_layout',"theme-default");
                $('body').removeClass().addClass('theme-default');
                $(".label-success").html("Dark Mode");
            }
        });

        $('.dropdown-menu li.active').parents('li').addClass('active');
        

        var letCollapseWidth = false,
        paddingValue = 30,
        sumWidth = $('.navbar-right-block').width() + $('.navbar-left-block').width() + $('.navbar-brand').width() + paddingValue;

        $(window).on('resize', function () {
            navbarResizerFunc();
        });

        var navbarResizerFunc = function navbarResizerFunc() {
            if (sumWidth <= $(window).width()) {
                if (letCollapseWidth && letCollapseWidth <= $(window).width()) {
                    $('#navbar').addClass('navbar-collapse');
                    $('#navbar').removeClass('navbar-collapsed');
                    $('nav').removeClass('navbar-collapsed-before');
                    letCollapseWidth = false;
                }
            } else {
                $('#navbar').removeClass('navbar-collapse');
                $('#navbar').addClass('navbar-collapsed');
                $('nav').addClass('navbar-collapsed-before');
                letCollapseWidth = $(window).width();
            }
        };

        if ($(window).width() >= 768) {
            navbarResizerFunc();
        }

        $('[data-toggle="tooltip"]').tooltip();

        var trigger = $('.hamburger'),
            overlay = $('.overlay'),
            isClosed = false;
    
        trigger.click(function () {
            hamburger_cross();      
        });
        
        function hamburger_cross() {
            if (isClosed == true) {          
                overlay.hide();
                trigger.removeClass('is-open');
                trigger.addClass('is-closed');
                isClosed = false;
            } else {   
                overlay.show();
                trigger.removeClass('is-closed');
                trigger.addClass('is-open');
                isClosed = true;
            }
        }
        
        $('[data-toggle="offcanvas"]').click(function () {
            $('#wrapper').toggleClass('toggled');
        });  
        
        /********************* For Circle progess bar *********************/
        $('.second.circle').circleProgress({
            //value: 0.0658
            startAngle: -Math.PI / 2,
            emptyFill: "#7E8E8D"
        });

        $('.data-table').DataTable({
            "bInfo": false,
            dom: '<"top"f>t<"bottom"p><"clear">',
            "ordering": false
        });
    });
  
/**************** header *****************/

    $(document).ready( function () {
        let service_cat_id1 = $('.ticketReview').attr('data_ser_key');
        let msg_id = $('.ticketReview').attr('data_msg_id');
        
        //  $.ajax({
        //      async: false,    
        //      url: "https://followizaddons.com/vote/read1.php",
        //      dataType: "json",
        //      data:{user_id:user_id,ticket_id:service_cat_id1},    
        //      type: "POST",
        //      cache: false,
        //      crossDomain: true,
        //      success: function(response){            
        //          for(var i =0; response.data.length >i ; i++){
        //              msg_id = response.data[i]['msg_id'];
        //              var sec_div = $('#msg_'+msg_id).parents('.viewticket-followiz');
        //              let githu = '';  
        //              let c= response.data[i]['vote'];
                    
        //              for(j = 0; j < c; j++){ 
        //                  githu += ' <i class="fas fa-star" style="color: rgb(252, 215, 3);cursor: pointer;" aria-hidden="true"></i>';
        //              }
        //              let m = 5 - c;
        //              for(k = 0; k < m; k++){ 
        //                  githu += '<i class="far fa-star" style="cursor: pointer;" aria-hidden="true"></i>';
        //              }
        //              sec_div.find('.message-rating').append(githu);
        //          }
        //      }
        //  }); 
    });
  

/**************** Pdf Open Popup Code DRM *****************/
  
    function drm_nav11(pid){
      
        var data1 = {};  
        
        data1.payment_id = pid;
        data1.payment_date = $(".payment_drm").attr('data-payment-date');
        data1.payment_method = $(".payment_drm").attr('data-payment-method');
        data1.payment_amount = $(".payment_drm").attr('data-payment-amount');
        data1.user_id = user_info.id;
        data1.user_name = user_info.username;
        data1.first_name = user_info.first_name;
        data1.last_name = user_info.last_name;
        data1.email = user_info.email;
        data1.invcoice_name = user_info.invcoice_name;

        const invoice_api_url = api_end_point + "/invoice/";      
        $.ajax({
            url: invoice_api_url+"generateInvoice.php",       
            type: "POST",                  
            data:  data1,        
            async: false,         
            dataType: "json",
            cache: false,
            crossDomain: true,        
            success: function(data2)         
            {
                let tbody = '';
                tbody += '<a href="https://followizaddons.com/client_js/invoice/' + data2.file_path + '" style="float:right;padding:10px;" target="_blank" class="download11" ><button type="button" class="btn btn-primary">Download</button></a>'; 
                tbody += '<iframe src="https://followizaddons.com/client_js/invoice/' + data2.file_path + '" style="width: 100%;height: 80%;top: 5%;position: relative;" title="'+data2.payment_id+'"></iframe>';
                $('#drm_nav' + data2.payment_id).append(tbody);
            }
        });
  
    }
/**************** Pdf Open Popup Code DRM *****************/
  

  
/******************************* SERVICES PAGE START *****************************/
  
    /****************************** code to append service into table *********/
    let serviceOrder = [];
    function loadServiceOrder(link) {
        $.ajax({
            async: false,
            url: link,      
            type: "GET",
            dataType: "json",
            cache: false,
            crossDomain: true,
            success: function(response)         
            {
                serviceOrder = response.data;
                loadServicesAuto(serviceOrder);
            }
        });
    }
  
    function loadServicesAuto(serviceOrder){
        $(".filter--text").remove();
        $(".filter--id").remove();
        $(".servie-data-panel").each(function(){
            let service_cat_id = $(this).attr('data-cat_key');
            let serviceContent = $("#service_container_"+service_cat_id).text().trim();
            let sortedService = {};
            let service_of_cat = serviceByCate[service_cat_id];
            let filter_text = "";
            let filter_id = "";
            for (const [key, value] of Object.entries(service_of_cat)) { 
                filter_text += value['name'] + " ";
                filter_id += value['id'] + " ";
            }
    
            $(this).find(".collapsed").append("<div class='filter--text' style='display:none'>" + filter_text + "</div>");
            $(this).find(".collapsed").append("<div class='filter--id' style='display:none'>" + filter_id + "</div>");
            
        });
        
    }    
      
    function getTbodyForService(serviceDetails, category_name){
        let tbody = '';
        for(var k in serviceDetails) {
           
            let service = serviceDetails[k];
            let service_id = serviceDetails[k]['id'];

            tbody += '<tr class="tablerowid" id="trow-' + service_id + '">'; 
            tbody += '<td class="id review-hover-zone">' + service_id; 
            tbody += '<div class="rating-wrap"><div class="reviewShowOnly" id="reviewShowOnly_' + service_id + '" data-service_id="' + service_id + '"></div>';
            tbody += '<div class="review" id="review_' + service_id + '" data-service_id="' + service_id + '"></div> </div></td>';
            
            let service_name = serviceDetails[k]['name'];
            tbody += '<td class="width-25 name"><a href="#" class="order-again-btn" data-service_id="' + service_id + '" data-service-category="' + category_name + '">' + service_name + '</a></td>';
            
            tbody += '<td>' + serviceDetails[k]['rate'] + ' </td>' ;
            tbody += '<td>' + serviceDetails[k]['min'] + ' / ' + serviceDetails[k]['max'] + '</td>';
            tbody += '<td><div class="service-description service-description-split" id="' + service_id + '"></div>';
              
            let quality = start_time = speed_per_day = min_max = refill_available = price_per_1000 = details = drop = model_details = '';
           
            if(isNotEmpty(serviceDetails[k]['description']) ){
            
                let s_des = serviceDetails[k]['description'].split("<br>");
                let model_des_arr = serviceDetails[k]['description'].split("Details");
                
                if(isNotEmpty(model_des_arr[1]) ){
                    model_details = model_des_arr[1].ltrim(':');
                    model_details = serviceDetails[k]['description'];//override all feature show details plain
                }
          
                for(var j in s_des) {
                    let temp_array = s_des[j].split(":");
        
                    if(temp_array[0] == 'Quality'){
                        quality = temp_array[1];
                    }
        
                    if(temp_array[0] == 'Start Time'){
                        start_time = temp_array[1];
                    }
        
                    if(temp_array[0] == 'Speed per Day'){
                        speed_per_day = temp_array[1];
                    }
                
                    if(temp_array[0] == 'Min/Max'){
                        min_max = temp_array[1];
                    }
        
                    if(temp_array[0] == 'HQ Refill Available'){
                        refill_available = temp_array[1];
                    }
        
                    if(temp_array[0] == 'Refill Available'){
                        refill_available = temp_array[1];
                    }
        
                    if(temp_array[0] == 'Price per 1000'){
                        price_per_1000 = temp_array[1];
                    }
        
                    if(temp_array[0] == 'Details'){
                        details = temp_array[1];
                    }
        
                    if(temp_array[0] == 'Drop'){
                        drop = temp_array[1];
                    }
                
                }
                
            }//description if
      
            tbody += ' <span class="quality-split-' + service_id + '">' + quality + '</span></td>';
            tbody += '<td><span class="time-split-' + service_id + '">'+start_time+' </span></td>';
            tbody += '<td><span class="speed-split-' + service_id + '">'+speed_per_day+' </span></td>';
            tbody += '<td><span class="avgtime-split-' + service_id + '">' + serviceDetails[k]['average_time'] + '</span></td>';
            tbody += '<td><span class="refill-split-' + service_id + '">' + refill_available + ' </span></td>';
             
            tbody += '<td class="rest-details" data-serviceid="' + service_id + '">';
            if(model_details == ''){
                tbody += '<button class=" icon disabled">';
                tbody += '<img src="https://followizaddons.com/followiz-icons/details_eye_icon.svg">';
                tbody +='</button>';
            }else{
                tbody += '<button class="icon rest-details-modal btn" service_id = "' + service_id + '" service_detail_id = "' + serviceDetails[k]['id'] + '">';
                tbody += '<span class="d-hide detail-name">' + serviceDetails[k]['name'] + '</span>';
                tbody += '<span class="d-hide service-detail">' + model_details + '</span>';
                tbody += '<img src="https://followizaddons.com/followiz-icons/details_eye_icon.svg">';
                tbody += '</button>';
            }
            tbody += '</td></tr>'; 
        }
        return tbody;
        
    }
  
    function TRowHoverAction(){
        $(".tablerowid").mouseover(function(){
            $(this).find(".reviewShowOnly").css("display", "none");
            $(this).find(".review").css("display", "block");
        })

        $(".tablerowid").mouseout(function(){
            $(this).find(".reviewShowOnly").css("display", "block");
            $(this).find(".review").css("display", "none");
        })
    }

    // str_time format:  "1 minute", "9 minutes", "1 hour 6 minutes", "54 hours 34 minutes", "Not enough data"   
    function isLessOneMinute(str_time){
        if(str_time.includes("hour") || str_time == "Not enough data"){
            return false;
        }
        return true;
    }
/******************************* SERVICES PAGE END *****************************/

/******************************* ORDER PAGE START *****************************/
    function orderAgainBtn_action(){
        $(".order-again-btn").click(function(e){
            let service_id = $(this).attr("data-service_id");
            let selected_category = $(this).attr("data-service-category");
            localStorage.setItem("selected_category", selected_category);

            location.href = homeURL + '?service=' + service_id;
        })
    }
/******************************* ORDER PAGE END *****************************/

    let firstSocialPlateForm = '';
    let mainCategory = [];
    let subCategory = []; 
    let myFavoriteServices = [];
    let newServices = [];
    let mainBestSeller = [];
    let subBestSeller =[];
    let serviceOrderNew = [];

    $(document).ready(function(){
    
        /********************************************* NEW ORDER PAGE START ***************************************************/
            if($('#order-form').length > 0){
                
                /***************** Initialize New Order Page Component START **********************/
                    $(document).on('submit','#order-form',function(){
                        localStorage.setItem('ordersuccesscount',1);
                        localStorage.setItem('main-category', $('#orderform-main-category').val());
                        localStorage.setItem('category', $('#orderform-category').val());
                        localStorage.setItem('service', $('#orderform-service').val());
                    })     
                
                    $('#orderform-main-category').on('keydown', function(e) {
                        if (e.originalEvent && e.which == 40) {
                            e.preventDefault();
                        }
                    });
            
                    $("#order_searchService").on('keyup', function(e){
                        if($(this).val().length > 0){
                            selectServiceByServiceIDManually($(this).val());
                        }
                    })

                    function selectServiceByServiceIDManually(service_id){
                        let selected_service = getServicesId(service_id);
            
                        let category_name = categories[selected_service.cid];
                        let ssArr = category_name.split("-");
                        let main_category = ssArr[0].trim();
            
                        $("#orderform-main-category").val(main_category).trigger('change');
                        setTimeout(function(){
                            $("#orderform-category").val(selected_service.cid).trigger('change');
                        }, 200);
                        setTimeout(function(){
                            $("#orderform-service").val(selected_service.id).trigger('change');
                        }, 800);
                    }
                
                    // populate new order form value    
                    $("#orderform-service").on("change", function(){
                        let sel_service_id = $(this).val();
                        //Delay because else the value it was taking from the description was from the previous service chosen
                        setTimeout(function() {
                            updateMinMax();
                            UpdateDescription();
                            updateServiceTitle();
                            updateRating(sel_service_id);
                        }, 100)
                    });
            
                    
                    //CODE TO CHANGE LINK TO ACCOUNT LINK  ON NEW ORDER PAGE 
                    $('#field-orderform-fields-quantity').attr('placeholder',"Min: 5 - Max: 30000");
                    
                    $('#dripfeed-options').append('<p style="color:red;font-weight:bold;">MINIMUM INTERVAL SHOULD BE AT LEAST 4 TIMES THE START TIME.<br>We will not refund any orders that does not follow this rule.</p>');
                
                    var selected_val =  $("#orderform-service").val();
                    if(!selected_val){
                        selected_val = $("#orderform-service").prop("selectedIndex", 0).val();
                    }
                    
                    $('#field-orderform-fields-check').on('click', function(){
                        $('#dripfeed-options').find('p').remove();
                    })
            
                    $("#field-orderform-fields-check").on("change", function(){
                        //ADD POP IN DRIP-FEED INTERVEL INPUT FIELD
                        let templateData = '<div class="main_category bg_color" id="main_category_id"><div class="service_type "><p class="text_color">Interval should be at least 4 times the start time.(start time x 4=Interval) if this rule  is not followed , we will not refund any orders.</p></div></div>';
                        $("#dripfeed-options").find("#main_category_id").remove();
                        $("#dripfeed-options").find("div:nth-child(2)").find('.control-label').append(templateData);  
                    
                    });
            
                    $("#orderform-main-category, #orderform-category").select2({
                        templateSelection: formatState1,
                        templateResult: formatState1,
                    });

                    $("#orderform-service").select2({
                        templateSelection: formatState2,
                        templateResult: formatState2,
                    });
            
                    $("#orderform-main-category, #orderform-category, #orderform-service").on("select2:open", hideSelect2Keyboard);

                /***************** Initialize New Order Page Component END **********************/


    
                /**************** get category ordeing and save in local ******************/
                function loadCategoryOrderLocal(link) {
                    $.ajax({
                        async: false,
                        url: link,      
                        type: "GET",
                        dataType: "json",
                        cache: false,
                        crossDomain: true,
                        success: function(response)         
                        {
                            localStorage.setItem('categoryOrder', JSON.stringify(response.data));
                        }
                    });
                }

                // if(!localStorage.getItem('categoryOrder')){
                    const categoryOrderURLlocal = 'https://followizaddons.com/client_js/service_order/category.php'; 
                    loadCategoryOrderLocal(categoryOrderURLlocal);
                // }

               
                function loadServiceOrderNew(link) {
                    $.ajax({
                        async: false,
                        url: link,      
                        type: "GET",
                        dataType: "json",
                        cache: false,
                        crossDomain: true,
                        success: function(response)         
                        {
                            serviceOrderNew = response.data;
                        }
                    });
                } 
            
                const serviceOrderURL = 'https://followizaddons.com/client_js/service_order/index.php';
                loadServiceOrderNew(serviceOrderURL);


                getMyFavoriteServices();
                getNewServices();
                getBestSellers();
                
                // Services Update panel
                if($("#table-updates-order").length > 0){
                    loadUpdatesNew("https://followizaddons.com/client_js/updates/updates_service.php");
                }

                const params = new URLSearchParams(window.location.search);
                let selected_main_category = "";
                
                // if Order Again button clicked
                if(params.has('service')){
                    let sel_service_id = params.get('service');
                
                    let selected_category =  localStorage.getItem("selected_category");
                    let ssArr = selected_category.split("-");
                    selected_main_category = ssArr[0].trim();
                } 
                
                for (const [key, value] of Object.entries(categories)) {
                    let ssArr = value.split("-");
                    let ssName = ssArr[0].trim();
                    
                    if(ssName !== firstSocialPlateForm){
                        mainCategory[key] = ssName;
                        firstSocialPlateForm = ssName; 
                    
                        if(typeof subCategory[ssName] === 'undefined'){
                            subCategory[ssName] = [];
                        }
                    }
                    subCategory[ssName][key] = value; 
                    
                    // If Order Again button click mode
                    if(params.has('service')){
                        let selected_category =  localStorage.getItem("selected_category");
                        if(selected_category == value){
                            localStorage.setItem('category', key);
                        }
                    }
                }
        
                //sort categories
                let sortedMainCategory = [];
                let sortedCategoryIds = JSON.parse(localStorage.getItem('categoryOrder'));
                if(sortedCategoryIds){
                    sortedCategoryIds.forEach((cat)=>{
                        let catId = parseInt(cat.category_id);
                        
                        if(typeof mainCategory[catId] != 'undefined'){
                            sortedMainCategory[cat.sort_order] = mainCategory[catId];
                        }
                        
                    });
                }else{
                    sortedMainCategory = mainCategory;
                }      
        
                let oldMainCat = sortedMainCategory;
                mainCategory = [];
        
                mainCategory = oldMainCat.filter(onlyUnique);
            
                let mainCategoryOption = '<option value="New Services">New Services</option>';
                
                let firstOption = "";
                
                if(params.has('service')){
                    // selected from services page
                    firstOption = selected_main_category;
                } else if (localStorage.getItem('main-category')) {
                    // re-order
                    firstOption = localStorage.getItem('main-category');
                } else {
                    firstOption = "New Services";
                    mainCategoryOption = '<option value="New Services" selected="true">New Services</option>';
                }

                mainCategoryOption += '<option value="Your Favorite Services">Your Favorite Services</option>';
                
                mainCategory.forEach(element => {
                    if(firstOption === '' || firstOption == element){
                        firstOption = element;
                        mainCategoryOption += '<option value="' + element + '" selected="true">' + element + '</option> ';
                    } else {
                        mainCategoryOption += '<option value="' + element + '" >' + element + '</option> ';
                    }
                    
                }); 
            
                $("#orderform-category").change(function(){

                    var cat_id = $('option:selected', $(this)).val();

                    // get services by selected category
                    let orderform_service = getServiceByCategoryId(cat_id);

                    let lsubCategoryOption = '';
                    
                    let newSortedService = [];
                    let best_ids = [];

                    // if best seller should to order by excel docu.. so let it
                    if(cat_id == "Best sellers"){
                        let index = 0;
                        for (const [key, value] of Object.entries(orderform_service)) {			
                            let temp = [];
                            temp['key'] = orderform_service[key]['id'];
                            temp['value'] = orderform_service[key]['name']; 
                            temp['type'] = orderform_service[key]['type'];

                            newSortedService[index] = temp;
                            index++;
                        }
                    } else {
                        
                        
                        var selected_category_name = $("#orderform-category option:selected").text();

                        // get best seller for selected category id
                        for(let index = 0; index < subBestSeller.length; index++){
                            if(subBestSeller[index].category_name == selected_category_name){
                                best_ids = subBestSeller[index].best_ids.split(" ");
                            }
                        }
                        
                        let index = 0;

                        // at first put best sellers.
                        best_ids.forEach((id) => {
                            for (const [key, value] of Object.entries(orderform_service)) {
                                if(id == key){
                                    let temp = [];
                                    temp['key'] = key;
                                    temp['value'] = orderform_service[key]['name'];
                                    if(isLessOneMinute(orderform_service[key]['average_time'])){
                                        temp['value'] += " ⚡";
                                    }
                                    temp['type'] = orderform_service[key]['type'];
                                   
                                    newSortedService[index] = temp;
                                    index++;
                                }
                            }
                        })

                        // put separator
                        // if(best_ids.length > 0 && index > 0){
                        //     let separator = [];
                        //     separator['key'] = '';
                        //     separator['value'] = '------------------ ☝️ Best Sellers Above ☝️ ------------------'; 
                        //     separator['type'] = 'disabled';
                        //     newSortedService[best_ids.length] = separator;
                        // }

                        // and then put rest services
                        for (const [key, value] of Object.entries(orderform_service)) {	
                            if(!best_ids.includes(key)){
                                let sort_order_arr = serviceOrderNew.filter((order)=>{  return order.service_id == key; });		 
                                if(sort_order_arr[0] !== undefined){		
                                    let sort_val = sort_order_arr[0];           
                                    
                                    let temp = [];
                                    temp['key'] = key;
                                    temp['value'] = orderform_service[key]['name']; 
                                    if(isLessOneMinute(orderform_service[key]['average_time'])){
                                        temp['value'] += " ⚡";
                                    }
                                    temp['type'] = orderform_service[key]['type'];
                                    newSortedService[sort_val.sort_order + best_ids.length] = temp;
                                }
                            }
                        }
                    }
                   

                    let service = '';
                    
                    if(localStorage.getItem('service')){
                        service = localStorage.getItem('service');
                    }

                    let index = 0;

                    // if(cat_id == "Your Favorite Services" || cat_id == "New Services" || cat_id == "Best sellers"){
                        newSortedService.forEach((element, key) => {	
                            if(index == 0 && best_ids.length > 0){
                                lsubCategoryOption += '<optgroup label="--- 👍 Best Sellers 👍 ---">';
                            }
                            if(best_ids.length > 0 && index == best_ids.length){
                                lsubCategoryOption += '</optgroup>';
                                lsubCategoryOption += '<optgroup label="Sellers">';
                            }

                           
                            let textVal = element['value'];
                            let pattern = / per \d*[0-9]/;
                            let result = pattern.test(textVal);
                            
                            if(result == true){
                                let string = textVal.split("—");
                                textVal = "";
                                
                                for(let i =0; i < (string.length -1); i++){
                                    textVal += string[i];
                                }
                            }
                            
                            if(element['key'] == service){
                                lsubCategoryOption += '<option selected="true" data-type="' + element['type'] + '"  value="' + element['key'] + '" >' + textVal + '</option> ';
                            }else{
                                lsubCategoryOption += '<option data-type="' + element['type'] + '"  value="' + element['key'] + '" >' + textVal + '</option> ';
                            }
                            index++;
                            
                            // if(element['type'] == 'disabled'){
                            //     lsubCategoryOption += '<option data-type="" value="" disabled="disabled">' + element['value'] + '</option> ';
                            // }
                            // else{
                            //     let textVal = element['value'];
                            //     let pattern = / per \d*[0-9]/;
                            //     let result = pattern.test(textVal);
                                
                            //     if(result == true){
                            //         let string = textVal.split("—");
                            //         textVal = "";
                                    
                            //         for(let i =0; i < (string.length -1); i++){
                            //             textVal += string[i];
                            //         }
                            //     }
                                
                            //     if(element['key'] == service){
                            //         lsubCategoryOption += '<option selected="true" data-type="' + element['type'] + '"  value="' + element['key'] + '" >' + textVal + '</option> ';
                            //     }else{
                            //         lsubCategoryOption += '<option data-type="' + element['type'] + '"  value="' + element['key'] + '" >' + textVal + '</option> ';
                            //     }
                            // }
                        });
                        lsubCategoryOption += '</optgroup>';
                    
                        setTimeout(function(){
                            // service
                            // $("#orderform-service").html(lsubCategoryOption).val($('#orderform-service option:eq(0)').val()).trigger('change');
                            $("#orderform-service").html(lsubCategoryOption).trigger('change');
                        }, 100)
                        $("#orderform-category").select2("close");
                    // }
                })

                $("#orderform-main-category").html('').html(mainCategoryOption);
                createSubCategoryOption(firstOption, 1);
            
                $("#orderform-main-category").change(function(){
                    createSubCategoryOption($(this).val(), 2);
                })
                
                // order again button mode
                if(params.has('service')){
                    setTimeout(function(){
                        let sel_service_id = params.get('service');
                        $("#orderform-service").val(sel_service_id).trigger('change');
                    }, 500);
                }
            }
        /********************************************* NEW ORDER PAGE END ***************************************************/



        /********************************************* SERVICE PAGE START ***************************************************/
            if($('.service_page').length > 0){
                // search category
                $(document).on("change", ".selectpicker",function() {
            
                    // Retrieve the input field text and reset the count to zero
                    var filter = $(this).val(),
                        count = 0;
                    
                    // Loop through the comment list
                    $('.well .servie-data-panel').each(function() {
                        if(filter == "all"){
                            $(this).show();
                        }
                        else{
                            // If the list item does not contain the text phrase fade it out
                            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                                $(this).hide();  // MY CHANGE
                                // Show the list item if the phrase matches and increase the count by 1
                            } else {
                                $(this).show(); // MY CHANGE
                                count++;
                            }
                        }
                    });
                });
            
                // search key
                $(document).on("keyup", "#searchService",function() {
            
                    // Retrieve the input field text and reset the count to zero
                    var filter = $(this).val(),
                        count = 0;
                    let flag = false;
                    
                    $('.well .servie-data-panel a.list-item').each(function() {
                        let texts = $(this).find(".filter--text").html();
                        let ids =  $(this).find(".filter--id").html();
                    
                        if (texts.search(new RegExp(filter, "i")) < 0 && ids.search(new RegExp(filter, "i")) < 0) {
                            if(!$(this).hasClass("collapsed")){
                                $(this).parents(".servie-data-panel").find(".panel-collapse").collapse('toggle');
                            }
                            $(this).hide();  // MY CHANGE
                            // Show the list item if the phrase matches and increase the count by 1
                        } else {
                            $(this).show(); // MY CHANGE

                            if(filter.length == 0 && !$(this).hasClass("collapsed")){
                                $(this).parents(".servie-data-panel").find(".panel-collapse").collapse('toggle');
                            }
                            if(filter.length != 0 && !flag ){
                                flag = true;
                                if($(this).hasClass("collapsed")){
                                    $(this).click();
                                }
                            }
                        } 
                    });
                
                    // Loop through the comment list
                    $('.well .servie-data-panel tr').each(function() {
                        // If the list item does not contain the text phrase fade it out
                        if ($(this).html().search(new RegExp(filter, "i")) < 0) {
                            $(this).hide();  // MY CHANGE
                        // Show the list item if the phrase matches and increase the count by 1
                        } else {
                            $(this).show(); // MY CHANGE
                            count++;
                        }
                    });
                });

                $(document).on("click", ".rest-details", function(){
                    if ($(this).hasClass('Model-fill')){
                        return;
                    }
                    $(this).addClass('Model-fill');
                    return; //overide function show palin details
                })

                if(typeof serviceByCate != 'undefined'  ){
                    
                    for(let i = 0; i < serviceByCate.length; i++){
                        for(const [key, value] of Object.entries(serviceByCate[i])){
                            if(isLessOneMinute(value['average_time'])){
                                serviceByCate[i][key]['name'] += " ⚡";
                            }
                        }
                    }

                    const serviceOrderURL = 'https://followizaddons.com/client_js/service_order/index.php';
                    loadServiceOrder(serviceOrderURL);   
                    
                    $(".servie-data-panel .list-item").click(function(){
                        
                        let inputed_val = $("#searchService").val();
                        let parent_panel = $(this).parents('.servie-data-panel');
                        let service_cat_id = parent_panel.attr('data-cat_key');
                        
                        let serviceContent = $("#service_container_"+service_cat_id).text().trim();
                        
                        //  searchService
                        let sortedService = {};
                        let service_of_cat = serviceByCate[service_cat_id];
                        
                        let last_order_num = 1;
                        let temp = [];
                        for (const [key, value] of Object.entries(service_of_cat)) {
                            if(value['id'].search(new RegExp(inputed_val, "i")) >= 0 || value['name'].search(new RegExp(inputed_val, "i")) >= 0 ){
                                let sort_order_arr = serviceOrder.filter((order)=>{  return order.service_id == key; });				
                                let sort_val = sort_order_arr[0];
                                
                                if(sort_val){
                                    sortedService[sort_val.sort_order] = value;
                                    last_order_num = sort_val.sort_order;
                                }
                                else
                                    temp.push(value);
                            }                
                        }

                        if(temp.length > 0){
                            temp.forEach(function(element){
                                last_order_num++;
                                sortedService[last_order_num] = element;
                            })
                        }

                        let category_name = $(this).parents('.servie-data-panel').attr("data-category");
                        let tbody = getTbodyForService(sortedService, category_name);
                        $("#service_container_" + service_cat_id).html(tbody);
            
                        orderAgainBtn_action();
                        
                        $(".rest-details-modal").on("click", function(){
                            $("#service_detail_id").html(" Id : " + $(this).attr("service_detail_id"));
            
                            $("#service_detail_name").html($(this).find("span.detail-name").html());
                            $("#service_detail").html($(this).find("span.service-detail").html());

                            $("#service_detail_modal").modal('show');
                        })
            
                        // Service Page Review star
                        var userRatingArr = getUserRating();
                        TRowHoverAction();
                    
                    })
                }
            }
        /********************************************* SERVICE PAGE END ***************************************************/



        /********************************************* ORDER PAGE START ***************************************************/
            // ORDER, Services page
            if($('.order_page').length > 0){ 
                orderAgainBtn_action();
            }
        
            //code to sow readonly ration on order page
            if (currentURL.includes('orders')) {
                getUserRatingForOrder();
                TRowHoverAction();
            }
        /********************************************* ORDER PAGE END ***************************************************/

          

        /********************************************* FAQ PAGE START ***************************************************/
            if($('.faq_section').length > 0){
            
                $(".ques_1").css("display","none");
                
                $("h2.show_anser").click(function(e){
                    console.log("Faq clicked");
                    if($(this).hasClass('active')){
                        $(this).removeClass('active');
                        $(this).next().slideUp();
                    }else{
                        $("h2.show_anser").removeClass('active');
                        $("h2.show_anser").next().slideUp();
                        $(this).addClass('active');
                        $(this).next().slideDown();
                    }
                })

                // Add minus icon for collapse element which is open by default
                $(".collapse.show").each(function(){
                    $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
                });
                
                // Toggle plus minus icon on show hide of collapse element
                $(".collapse").on('show.bs.collapse', function(){
                    $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
                }).on('hide.bs.collapse', function(){
                    $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
                }); 
            }
        /********************************************* FAQ PAGE END ***************************************************/
        
        
        
        /********************************************* TICKET PAGE START ***************************************************/
        // $(".custom-tabing .tab-panel:first-child h2").first().addClass("active");
            if($(".ticket-page").length > 0){
                $(document).on('click', '.custom-radio li', function(e) {
                    $(this).parents('.custom-radio').find("li").removeClass("active");
                    $(this).addClass("active");
                    $(this).find("input").prop("checked",true);
                });

                $('.order-id  ul li').click(function(){
                    var ind = $(this).index();
                    $(".custom-tabing .tab-panel").hide();
                    $(".custom-tabing .tab-panel").removeClass("active");
                    $(".custom-tabing .tab-panel").eq(ind).show();
                    $(".custom-tabing .tab-panel").eq(ind).addClass("active");
                }); 

                //CODE FOR TICKET FORM 	
                $(".top_radio > li").click(function(){
                    $(".custom-radio > li").removeClass('active');
                    //hide all extra field
                    $("#txtIdInput").attr('style','display:none');
                    $("#acNumIdInput").attr('style','display:none');
                    $("#opIdInput").attr('style','display:none');
                    $("#message_box").val('');
                    $("#txtIdInput").val('');
                    $("#acNumIdInput").val('');
                    $("#opIdInput").val('');
                    
                    $(".designradio").removeAttr('checked');
                    $(this).find(".designradio").attr('checked','checked');
                    
                    //show order id on tab11 hide on rest
                        
                    if($(this).attr('href') =="#tab11" ){
                        $("#orderIdInput").attr("style","display:block");
                    }else{
                        $("#orderIdInput").attr("style","display:none");
                    }  
                
                    if($(this).attr('href') =="#tab11" ){
                        $("#refill_options").trigger("click");
                    }
                    
                    if($(this).attr('href') =="#tab2" ){
                        $("#coinpayments_request").trigger("click");
                    }
                    
                    if($(this).attr('href') =="#tab2" ){
                        
                        $("#txtIdInput").attr('style','display:block');
                    }
                    
                    if($(this).attr('href') =="#tab5" ){
                        $("#btn_feature").trigger("click");
                    }
                        
                });
                
                //code to manage inpute field on payment tab
                $("#coinpayments_request").click(function(){
                    $("#txtIdInput").attr('style','display:block');
                    $("#acNumIdInput").attr('style','display:none');
                    $("#opIdInput").attr('style','display:none');            
                });
            
                $("#coinbase_request").click(function(){      
                    $("#txtIdInput").attr('style','display:block');
                    $("#acNumIdInput").attr('style','display:none');
                    $("#opIdInput").attr('style','display:none');         
                });
        
                $("#perfect_money_request").click(function(){
                    $("#txtIdInput").attr('style','display:none');
                    $("#acNumIdInput").attr('style','display:block');
                    $("#opIdInput").attr('style','display:none');
                });
            
                $("#payneer_request").click(function(){    
                    $("#txtIdInput").attr('style','display:none');
                    $("#acNumIdInput").attr('style','display:none');
                    $("#opIdInput").attr('style','display:block');
                });
                
                $("#strip_request, #other_request").click(function(){
                    $("#txtIdInput").attr('style','display:none');
                    $("#acNumIdInput").attr('style','display:none');
                    $("#opIdInput").attr('style','display:none');
                });
                
                //code to process ticket form befor submit
                /*$("#txt_id").change(function(){
                    let msgVal = "TXT ID :: "+ $("#txt_id").val();
                    $("#message_box").val(msgVal);
                })
                        
                $("#acNum").change(function(){
                    let msgVal = "Account Number :: "+ $("#acNum").val();
                    $("#message_box").val(msgVal);
                })
            
                $("#op_id").change(function(){
                    let msgVal = "Operation ID :: "+ $("#op_id").val();
                    $("#message_box").val(msgVal);
                })*/




                //var clickedBtn = false;      
                $(document).on("click","#submitTicketBtn", function(e){
                    e.preventDefault();
                    var subject = $("input:radio[name=subject]:checked").val();
                    var request = $("input:radio[name=request]:checked").val();
                
                    var ticketSubject = '';
                
                    if(subject == 'Orders'){
                
                        /*if(request == 'Coinpayments' || request == 'Coinbase' || request == 'Perfect Money' || request == 'Payeer' || request == ''){
                            request = 'Refill';
                        }*/
                        if($('#order_id').val() == ''){
                            $('.alert-danger').show();
                            $('.alert-danger > div').html('<div>Order ID cannot be blank.</div>');
                            return;
                        }
                
                        let order_id = $("#order_id").val();
                        if(order_id != ''){
                            ticketSubject = subject+" - "+request+" - "+order_id;
                        }
                
                    } else if(subject == 'Payments'){
                        
                        
                        if(request == 'Coinpayments'){
                            if($('#txt_id').val() == ''){
                                $('.alert-danger').show();
                                $('.alert-danger > div').html('<div>Transaction ID cannot be blank.</div>');
                                return;
                            }else{
                                let txt_id = $("#txt_id").val();
                                if(txt_id != ''){
                                    ticketSubject = subject+" - "+request+" - "+txt_id;
                                }
                            }
                        }else if(request == 'Coinbase'){
                            if($('#txt_id').val() == ''){
                                $('.alert-danger').show();
                                $('.alert-danger > div').html('<div>Transaction ID cannot be blank.</div>');
                                return;
                            }else{
                                let txt_id = $("#txt_id").val();
                                if(txt_id != ''){
                                    ticketSubject = subject+" - "+request+" - "+txt_id;
                                }
                            }
                        }else if(request == 'Perfect Money'){
                            if($('#acNum').val() == ''){
                                $('.alert-danger').show();
                                $('.alert-danger > div').html('<div>Account Number/ Batch Number cannot be blank.</div>');
                                return;
                            }else{
                                let acNum = $("#acNum").val();
                                if(acNum != ''){
                                    ticketSubject = subject+" - "+request+" - "+acNum;
                                }
                            }
                        }else if(request == 'Payeer'){
                            if($('#op_id').val() == ''){
                                $('.alert-danger').show();
                                $('.alert-danger > div').html('<div>Operation ID cannot be blank.</div>');
                                return;
                            }else{
                                let op_id = $("#op_id").val();
                                if(op_id != ''){
                                    ticketSubject = subject+" - "+request+" - "+op_id;
                                }
                            }
                        } else {
                            ticketSubject = subject+" - "+request;
                        }
                
                    }else if( subject=='Request'){
                        ticketSubject = subject+" - "+request;
                    }else{
                        ticketSubject = subject;
                    }
                    
                        if($("#vip-client").val() == "true"){
                        ticketSubject = "VIP: " + ticketSubject;
                    }
                    
                    $("#ticketSubject").val(ticketSubject);
                
                    $("#submitTicketBtn").submit();
                })
            }
        /********************************************* TICKET PAGE END ***************************************************/


        /********************************************* DEPOSIT PAGE START ***************************************************/
            if($(".deposit_page").length > 0){
                $(".payment_tab_link").click(function(){
                    var paymentTitle = $(this).attr("data-paymentName");
                    $("#form_payment_name").text(paymentTitle);
                
                    //For Perfectmoney EUR
                    if(paymentTitle == 'Perfect Money EUR'){
                        $("#perfect_eur_content").show();
                    }else{
                        $("#perfect_eur_content").hide();
                    }
                
                    //For Perfectmoney USD
                    if(paymentTitle == 'Perfect Money USD'){
                        $("#perfect_usd_content").show();
                    }else{
                        $("#perfect_usd_content").hide();
                    }
                
                    //For Stripe / Credit Card  
                    if(paymentTitle == 'Stripe / Credit Card'){
                        $("#stripe_content").show();
                    }else{
                        $("#stripe_content").hide();
                    }

                    //For Perfectmoney  
                    if(paymentTitle == 'PayPal'){
                        $("#payPal_content").show();
                    }else{
                        $("#payPal_content").hide();
                    }
            
                    //For CoinPayments
                    if(paymentTitle == 'Coinpayments'){
                        $("#coinPayments_content").show();
                    }else{
                        $("#coinPayments_content").hide();
                    }
                
                    //For payeer_content  
                    if(paymentTitle == 'Payeer'){
                        $("#payeer_content").show();
                    }else{
                        $("#payeer_content").hide();
                    } 
            
                    //For Perfectmoney  
                    if(paymentTitle == 'PayPal Invoice'){
                        $("#payPal_invoice_content").show();
                    }else{
                        $("#payPal_invoice_content").hide();
                    }

                    //For Cryptocurrency  
                    if(paymentTitle == 'CryptoCurrency'){
                        $("#cryptocurrency_content").show();
                    }else{
                        $("#cryptocurrency_content").hide();
                    }
            
                    //For Skrill  
                    if(paymentTitle == 'Skrill'){
                        $("#skrill_content").show();
                    }else{
                        $("#skrill_content").hide();
                    }
                       
                    $("#method").val($(this).attr("data-paymentId")).change();
                
                });

                $(".getInvoiceBtn").click(function(){
        
                    var data = {};
                    
                    data.payment_id = $(this).attr('data-payment-id');
                    data.payment_date = $(this).attr('data-payment-date');
                    data.payment_method = $(this).attr('data-payment-method');
                    data.payment_amount = $(this).attr('data-payment-amount');
                    data.user_id = user_info.id;
                    data.user_name = user_info.username;
                    data.first_name = user_info.first_name;
                    data.last_name = user_info.last_name;
                    data.email = user_info.email;
                    
                    generateInvoice(data);
                
                })
            }
        /********************************************* DEPOSIT PAGE END ***************************************************/


        if ( 
            currentURL.includes('subscriptions') ||
            currentURL.includes('drip-feed') ||
            currentURL.includes('refill') ) { 
        }

        if (currentURL.includes("updates"))  {
            $('#search').click(function(e) {
                var parentOffset = $(this).parent().offset();
                var relX = e.pageX - parentOffset.left;
        
                if (relX < 30) {
                    search = $(this).val();
        
                    var link = updateURL + "?search=" + search + "&category=" + category;
                    loadUpdates(link);
                }
            });
        
            $('#search').on('change', function() {
                search = $(this).val();
        
                var link = updateURL + "?search=" + search + "&category=" + category;
                loadUpdates(link);
            });
        
            loadUpdates(updateURL);
        };

        if (currentURL.includes("extra-feature")) 
        {
            // Best Seller selection
            $.get('https://followizaddons.com/bestseller/bestseller.php', function( response ) {
            });	

            //code to save user on our server
            $.get('https://followiz.com/admin/api/users/list', function( response ) {
                processUsers(response.data.pagination.pages);
            });	
          
            //code to update serive 
            $.get('https://followiz.com/admin/api/services/list', function( response ) {
                setTimeout(function(){
                    processCategoryOrder(response.data);
                }, 1500);
                
                setTimeout(function(){
                    processServices(response.data);
                }, 3000);
                
                setTimeout(function(){
                    processServicesOrder(response.data);
                }, 4500);            
            });
          
          
            //code to generate invoice for client
            $("body").prepend('<div id="paymentInfo" style="display:none"></div>');
            let paymentInfo = [];
            $.get( 'https://followiz.com/admin/payments', function( data ) {
                $("#paymentInfo").html('');
                $("#paymentInfo" ).html( $(data).find('table').clone() );
               
                setTimeout(function(){
                    $("#paymentInfo" ).find('tr').each(function() {
                        var data = {};
                        $(this).find('td').each(function(index, td) { 
                        
                            if(index == 0){
                                data.payment_id = parseInt($(this).text());
                            }
                            if(index == 1){
                                data.username = $(this).text();
                            }
                            if(index == 4){
                                data.payment_method = $(this).text();
                            }
                            if(index == 8){
                                data.payment_date = $(this).text();
                            }
                            if(index == 3){
                                data.payment_amount = parseFloat($(this).text());
                            }
                            if(index == 11){
                                paymentInfo.push(data);
                            }
                        });
                     
                    });
                    generateAllInvoice(paymentInfo);
                }, 200)
            });
              
        }
    });

/******************************* NEW ORDER PAGE START *****************************/
    function hideSelect2Keyboard(e){
        $('.select2-search input').prop('focus', false).blur();
    }

    function getImageName(serviceName){
        let type = "";
        if($("#orderform-main-category").length > 0){
            type = $("#orderform-main-category").val();
        }
        if(serviceName.includes("website") || type == "Website Traffic"){
            return "website.svg"
        }
        if(serviceName.includes("Traffic")){
            return "website.svg"
        }
        if(serviceName.includes("traffic")){
            return "website.svg"
        }
        if(serviceName.includes("instagram")){
            return "instagram-color.svg"
        }
    
        if(serviceName.includes("youtube")){
            return "youtube-color.svg"
        }
        
        if(serviceName.includes("facebook")){
            return "facebook-color.svg"
        }
    
        if(serviceName.includes("twitter")){
            return "twitter-color.svg"
        }
    
        if(serviceName.includes("coub")){
            return "coub-color.svg"
        }
    
        if(serviceName.includes("datpiff")){
            return "datpiff.svg"
        }
    
        if(serviceName.includes("imdb")){
            return "imdb-color.svg"
        }
    
        if(serviceName.includes("likee")){
            return "likee-color.svg"
        }
    
        if(serviceName.includes("linkedin")){
            return "linkedin-color.svg"
        }
    
        if(serviceName.includes("mixcloud")){
            return "mixcloud-color.svg"
        }
    
        if(serviceName.includes("ok.ru")){
            return "ok.ru-color.svg"
        }
    
        if(serviceName.includes("periscope")){
            return "periscope-color.svg"
        }
    
        if(serviceName.includes("pinterest")){
            return "pinterest-color.svg"
        }
    
        if(serviceName.includes("quora")){
            return "quora-color.svg"
        }
    
        if(serviceName.includes("reddit")){
            return "reddit-color.svg"
        }
    
        if(serviceName.includes("shazam")){
            return "shazam-color.svg"
        }
    
        if(serviceName.includes("snapchat")){
            return "snapchat-color.svg"
        }
    
        if(serviceName.includes("soundcloud")){
            return "soundcloud-color.svg"
        }
    
        if(serviceName.includes("spotify")){
            return "spotify-color.svg"
        }
    
        if(serviceName.includes("telegram")){
            return "telegram-color.svg"
        }
    
        if(serviceName.includes("tiktok")){
            return "tiktok-color.svg"
        }
    
        if(serviceName.includes("tumblr")){
            return "tumblr-color.svg"
        }
    
        if(serviceName.includes("twitch")){
            return "twitch-color.svg"
        }
    
        if(serviceName.includes("reverbnation")){
            return "reverbnation-color.svg"
        }
    
        if(serviceName.includes("vimeo")){
            return "vimeo-color.svg"
        }
    
        if(serviceName.includes("vk.com")){
            return "vk.com-color.svg"
        }
    
        if(serviceName.includes("yandex")){
            return "yandex-color.svg"
        }
    
        if(serviceName.includes("seo")){
            return "seo-color.svg"
        }
    
        if(serviceName.includes("guest")){
            return "guest-color.svg"
        }
    
        if(serviceName.includes("press")){
            return "press-color.svg"
        }
    
        if(serviceName.includes("android")){
            return "android-color.svg"
        }
    
        if(serviceName.includes("ios")){
            return "ios-color.svg"
        }
        if(serviceName.includes("audiomack")){
            return "audiomack-color.svg"
        }
        if(serviceName.includes("clubhouse")){
            return "clubhouse-color.svg"
        }
        if(serviceName.includes("discord")){
            return "discord-color.svg"
        }
    
        if(serviceName.includes("marketing")){
            return "marketing-color.svg"
        }
    
        if(serviceName.includes("new")){
            return "new-color.svg"
        }
    
        if(serviceName.includes("apple")){
            return "apple-color.svg"
        }
    
        if(serviceName.includes("behance")){
            return "behance-color.svg"
        }
    
        if(serviceName.includes("dailymotion")){
            return "dailymotion-color.svg"
        }
    
        if(serviceName.includes("deezer")){
            return "deezer-color.svg"
        }
    
        if(serviceName.includes("dribble")){
            return "dribble-color.svg";
        }
    
        if(serviceName.includes("fansly")){
            return "fansly-color.svg";
        }

    
        if(serviceName.includes("google")){
            return "google-color.svg";
        }
    
        if(serviceName.includes("kwai")){
            return "kwai-color.svg";
        }
    
        if(serviceName.includes("nft")){
            return "nft.svg";
        }
    
        if(serviceName.includes("onlyfans")){
            return "onlyfans-color.svg";
        }
    
        if(serviceName.includes("podcast")){
            return "podcast-color.svg";
        }
    
        if(serviceName.includes("sitejabber")){
            return "sitejabber.svg";
        }
    
        if(serviceName.includes("tidal")){
            return "tidal-color.svg";
        }
    
        if(serviceName.includes("trust")){
            return "trust.svg";
        }
    
        if(serviceName.includes("steam")){
            return "steam-color.svg";
        }
    
        if(serviceName.includes("yellow")){
            return "yellow-color.svg";
        }
    
        if(serviceName.includes("random")){
            return "random-color.svg";
        }

        if(serviceName.includes("your favorite")){
            return "favorite.svg";
        }

        if(serviceName.includes("new services")){
            return "marketing-color.svg";
        }
    
        if(serviceName.includes('best sellers')){
            return "bestseller.svg";
        }
        return "marketing.svg";
    }

    function formatState1(state) {
        if (!state.id) {
          return state.text;
        }
        var baseUrl = serverURL + "followiz-categories-icon";
        
        let imageURL = getImageName(state.element.text.toLowerCase());

        var $state = $(
            '<span><img src="' + baseUrl + '/' + imageURL  + '" class="img-flag" /> ' + state.text + '</span>'
        );
        
        return $state;
    }; 

    function formatState2(state) {
        if (!state.id) {
          return state.text;
        }
        var baseUrl = serverURL + "followiz-categories-icon";
        
        let imageURL = getImageName(state.element.text.toLowerCase());

        var name = state.text.split("-");
        var id_space = name[0] + "- ";
        var rest = name.splice(1);
        var rest_str = "";
        if(rest.length > 1)
            rest_str = rest.join('-');
        else if(rest.length == 1)
            rest_str = rest[0];

        var $state = $(
            '<span><img src="' + baseUrl + '/' + imageURL  + '" class="img-flag" /> <span class="id-space">' + id_space + '</span>' + rest_str + '</span>'
        );
        return $state;
    };

    function updateMinMax(){
        var selected_val =  jQuery("#orderform-service").val();
        if(!selected_val){
            selected_val = jQuery("#orderform-service").prop("selectedIndex", 0).val();
        }
    
        var serviceDetails = getServiceDetailsById(selected_val);

        jQuery(".service-description-split").html(serviceDetails.description);
        setTimeout(function(){
            let serviceDetailsMax = (parseInt(serviceDetails.max)).toLocaleString();
            let serviceDetailsmin = (parseInt(serviceDetails.min)).toLocaleString();
    
            jQuery(".minMax-split").html(serviceDetailsmin+"<br>"+serviceDetailsMax);
            jQuery('#field-orderform-fields-quantity').attr('placeholder',"Min: "+serviceDetailsmin+" - Max: "+serviceDetailsMax); 
            jQuery(".price-split").html(serviceDetails.price);

            // AVG Time set
            $(".avg_txt").html(serviceDetails.average_time);
        }, 200);
    }

    function UpdateDescription(){
    
        lines = jQuery(".service-description-split").html().split("<br>");
        
        jQuery(".service-description-split").html('');
        jQuery(".service-description-split").html('<div>' + lines.join("</div><div>") + '</div>');
    
        var i = 1;
        jQuery('.service-description-split div').each(function(){
            if(i < 6) {
                jQuery(this).addClass('split-class' + i);
                i++;
            }else{
                jQuery(this).addClass('split-class-extra');
            }
        });
        
        var extraData = '';
        var info = '';
    
        var infoArr = {};
        var infoStr = '';
        
        //CODE TO GET DETAILS DATA
    
        var detailsData = '';
        var profileData = '';
        var QualityExamplesData = '';
        
        var datakey = 'Details';
    
        $('.split-class-extra').each(function() {
            
            info = $(this).text();
            infoArr = info.split(":");
            infoStr = '';
            
            if( infoArr[0]  == 'Profile Has' || infoArr[0]  == 'Quality Examples' ){
                datakey = infoArr[0];
            } 
            
            if (datakey == "Details") {
                if(info != '- Profile Picture'){
                    // detailsData = detailsData + info.replace("-", "") + "<br>";
                    detailsData = detailsData + info + "<br>";
                }
                
            }
            
            if (datakey == "Profile Has") {
                if(info != 'Profile Has:'){
                    // profileData = profileData + info.replace("-", "") + "<br>";
                    profileData = profileData + info + "<br>";
                }
            }
            
            if (datakey == "Quality Examples") {
                if(info != 'Quality Examples:'){
                
                // var link = "<p>"+info.replace("-", "")+"</p>";
                var link = "<p>" + info + "</p>";
                
                QualityExamplesData = QualityExamplesData +  link ;
                }
            }
    
        })


        if(profileData){
            detailsData += "Profile Has:" + "<br>" + profileData;
        }

        if(QualityExamplesData){
            detailsData += "Quality Examples:" + "<br>" + QualityExamplesData;
        }
        
        jQuery(".details-split").html(detailsData);
        // jQuery(".details-split").html(detailsData);
        // jQuery(".Profile-split").html(profileData);
        // jQuery(".example-split").html(QualityExamplesData);

        var splt1 = jQuery( ".split-class1" ).text();
        
        if(!isNotEmpty(splt1)){
            return;
        }
        
        var str1 = splt1.split(":");
        if(str1[1])
            str1[1] = str1[1].replace("Start Time", "");
        jQuery(".quality-split").html(str1[1]);
    
        var splt2 = jQuery( ".split-class2" ).text();
        var str2 = splt2.split(":");
        if(str2[1])
            str2[1] = str2[1].replace("Start Time", "");
        jQuery( ".time-split" ).html(str2[1]);
    
        var splt3 = jQuery( ".split-class3" ).text();
        var str3 = splt3.split(":");
        if(str3[1])
            str3[1] = str3[1].replace("Speed per Day", "");
        jQuery( ".speed-split" ).html(str3[1]);
        
    
        var splt4 = jQuery( ".split-class4" ).text();  
        var str4 = splt4.split(":");
        
        
        if(str4[0]=='Min/Max'){

            str4[1] = str4[1].replace("Min/Max", "");
            jQuery( ".minMax-split" ).html(str4[1]);
    
            var splt5 = jQuery( ".split-class5" ).text();
            var str5 = splt5.split(":");
            
            if(str5[0]=='Refill Available'){
                jQuery( ".refill-split" ).html(str5[1]);
    
                var splt6 = jQuery( ".split-class6" ).text();
                var str6 = splt6.split(":");
                
                str6[1] = str6[1].replace("Price per 1000", "");
                jQuery( ".price-split" ).html(str6[1]);
        
            }else if(str5[0]=='Price per 1000') {
                jQuery( ".price-split" ).html(str5[1]);
            }
    
        } else if(str4[0]=='Refill Available') {
    
            str4[1] = str4[1].replace("Refill Available", "");
            jQuery( ".refill-split" ).html(str4[1]);
        
            var splt5 = jQuery( ".split-class5" ).text();
            var str5 = splt5.split(":");
            str5[1] = str5[1].replace("Price per 1000", "");
            jQuery( ".price-split" ).html(str5[1]);
        }  

       
    }

    function updateRating(service_id){
        $(".reviewShowOnly").attr("data-service_id", service_id);
        $(".review").attr("data-service_id", service_id);

        if(!service_id)
            return;
        let data = {user_id: user_id, service_id: service_id};

        jQuery.ajax({
            url: "https://followizaddons.com/vote/read_one.php",
            type: "POST",
            dataType: "json",
            data: data,
            cache: false,
            crossDomain: true,
            success: function(response) {
                if(response.status){
                    var user_rating = response.data;

                    $(".reviewShowOnly").rating({
                        "value": user_rating.vote ? user_rating.vote : 3,
                        "readonly": true
                    });

                    $(".review").rating({
                        "value": user_rating.my_vote ? user_rating.my_vote : 0,
                        "click": function (e) {
                            if(typeof e.event !== "undefined"){
                                var _service_id = (e.event.target.parentNode.getAttribute('data-service_id'));
                                insertOrUpdateVoteForOrder(user_id, _service_id, e.stars);
                                setTimeout(function(){
                                    getMyFavoriteServices();
                                    // $('#orderform-category').trigger('change');
                                }, 500);
                                $(".review").rating({
                                    "value":e.stars
                                });
                                $(".review").addClass("setted-own");
                            }
                        },
                    });
                    
                    if(user_rating.my_vote){
                        $(".review").addClass("setted-own");
                    }

                }
                else {
                    $(".review").rating({
                        "value": 0,
                        "click": function (e) {
                            if(typeof e.event !== "undefined"){
                                var _service_id = (e.event.target.parentNode.getAttribute('data-service_id'));
                                insertOrUpdateVoteForOrder(user_id, _service_id, e.stars);
                                setTimeout(function(){
                                    getMyFavoriteServices();
                                    // $('#orderform-category').trigger('change');
                                }, 500);
                                $(".review").rating({
                                    "value":e.stars
                                });
                                $(".review").addClass("setted-own");
                            }
                        },
                    });
                    $(".reviewShowOnly").rating({
                        "value": 3,
                        "readonly": true
                    });
                }

                review_hover();
                
                $(".reviewShowOnly").mouseover(function(){
                    $(this).css("display", "none");
                    $(this).parents(".review-wrapper").find(".review").css("display", "block");
                })

                $(".review").mouseout(function(){
                    $(this).css("display", "none");
                    $(this).parents(".review-wrapper").find(".reviewShowOnly").css("display", "block");
                })

            },
            error: function(jqXHR, textStatus, errorThrown) {
            }
        });
    }

    function updateServiceTitle(){
        var valService = $("#orderform-service").find("option:selected").text();
    
        jQuery( "#seviceTitle" ).text(valService);
        
        if (jQuery( "#seviceTitle" ).is(':contains("⛔")')) {
            jQuery('#cancel_text').html('<sapn style="color:#2FCD94 ">Yes</span>');
            jQuery('#cancel_btn').removeClass().addClass('bg_green');
        } else {
            jQuery('#cancel_text').html('<sapn style="color:#E93E3E ">No</span>');
            jQuery('#cancel_btn').removeClass().addClass('bg_red');
        }
        
        if (jQuery( "#seviceTitle" ).is(':contains("♻")')) {
            jQuery('#refill_text').html('<sapn style="color:#2FCD94">Yes</span>');
            jQuery('#refill_btn').removeClass().addClass('bg_green');
            //jQuery('#refill_avilable_id').removeClass().addClass('bg_green');
            //var cur_text = jQuery('#Refill-Available-txt').html();
            //jQuery('#Refill-Available-txt').html('<sapn style="color:#2FCD94 ">'+cur_text+'</span>');
            
        } else {
            jQuery('#refill_text').html('<sapn style="color:#E93E3E ">No</span>');
            jQuery('#refill_btn').removeClass().addClass('bg_red');
            //jQuery('#refill_avilable_id').removeClass().addClass('bg_red');
            
            //var cur_text = jQuery('#Refill-Available-txt').html();
            //jQuery('#Refill-Available-txt').html('<sapn style="color:#E93E3E ">None</span>');
        }
        
        //Refill Available - Depending on the service name
        var refillregex = new RegExp('[r[0-9]+\]');
        var refillregexlifetime = new RegExp('[r∞\]');
        
        if (refillregex.test(jQuery("#seviceTitle").text()) || refillregexlifetime.test(jQuery("#seviceTitle").text()) ) {
            var cur_text = jQuery('#Refill-Available-txt').html();
            jQuery('#Refill-Available-txt').html('<span style="color:#2FCD94 ">'+cur_text+'</span>');
            jQuery('#refill_avilable_id').removeClass().addClass('bg_green');
        }else{
            var cur_text = jQuery('#Refill-Available-txt').html();
            jQuery('#Refill-Available-txt').html('<sapn style="color:#E93E3E ">None</span>');
            jQuery('#refill_avilable_id').removeClass().addClass('bg_red');
        }
        
        if (jQuery(".refill-split").is(':contains("None")')){
            jQuery(".refill-split").css("color", "#e22424");
        }else{
            jQuery(".refill-split").css("color", "#3ecf8e");
        }
        
        if(jQuery(".details-split").text()==""){
            jQuery('.details-split').closest('.card').hide();
        }
        else{
            jQuery('.details-split').closest('.card').show();
        }
        
        jQuery('#fields .col-xs-6').removeClass('col-xs-6').addClass('col');
        jQuery('#fields .fa-trash-o').removeClass('fa-trash-o').addClass('fa-trash');
    }

    function getServiceDetailsById(service_id){
   
        var service_details = {};
        if(typeof window.modules.siteOrder !== 'undefined'){
            var services = window.modules.siteOrder.services;
            
            for (let list_service_id of Object.keys(services)) {
         
                if(list_service_id == service_id){
                    service_details = services[list_service_id];
                }
            }
        }
        
        return service_details;
    }; 

    function createSubCategoryOption(mainCatOption, onload){
        let subCategoryOption = '';
         
        if(mainCatOption == "Your Favorite Services"){
            subCategoryOption = '<option value="Your Favorite Services" selected="true">Your Favorite Services</option>';
        }else if(mainCatOption == "New Services"){
            subCategoryOption = '<option value="New Services" selected="true">New Services</option>';
        } else {
            
            let fO = ''; 

            // Order Again Mode
            if(localStorage.getItem('category')){
                fO = localStorage.getItem('category');
            }
            
            if(fO == "Best sellers" || fO == '')
                subCategoryOption = '<option value="Best sellers" selected="true">Best sellers</option>';
            else
                subCategoryOption = '<option value="Best sellers" >Best sellers</option>';
            
            let categoryOrder = '';
        
            if(localStorage.getItem('categoryOrder')){
                categoryOrder = localStorage.getItem('categoryOrder');
                categoryOrder = JSON.parse(categoryOrder);
            }
            
            let rowSubcategory = subCategory[mainCatOption];
            let sortedService = [];
        
            rowSubcategory.forEach((value, key)=>{
                let sort_order_arr = categoryOrder.filter((order)=>{  return order.category_id == key; });        	
            
                if(sort_order_arr.length){
                
                    let sort_val = sort_order_arr[0];
                        
                    let sort_index = (sort_val.sort_order).toString();
                    let temp = {};
                
                    temp.value = value;
                    temp.category_id = sort_order_arr[0].category_id;
                    sortedService[sort_index] = temp;
                }
            });

            sortedService.forEach((element,key) => {	
                if ( fO == element["category_id"]){
                    subCategoryOption += '<option cat_id="' + key + '" value="' + element["category_id"] + '" selected="true">' + element['value'] + '</option> ';
                } else {
                    subCategoryOption += '<option cat_id="' + key + '" value="' + element["category_id"] + '" >' + element['value'] + '</option> ';
                }
            });
        }

        $("#orderform-category").html(subCategoryOption);
        
        setTimeout(
            function(){ 
                $('#orderform-category').trigger('change');
            }, 
        500);
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function getServicesId(service_id_key) {
        var service_details = {};
        if(typeof window.modules.siteOrder !== 'undefined'){
            var services = window.modules.siteOrder.services;
            
            for (let list_service_id of Object.keys(services)) {
         
                if(list_service_id.search(new RegExp(service_id_key, "i")) >= 0){
                    service_details = services[list_service_id];
                    break;
                }
            }
        }
        
        return service_details;
    };

    function getServiceByCategoryId(catId) {

        var service_details = [];
        var services = window.modules.siteOrder.services;

        if(catId == "Your Favorite Services" && myFavoriteServices.length > 0){
            for (let list_service_id of Object.keys(services)) {
                for(let i = 0; i < myFavoriteServices.length; i++){
                    if (services[list_service_id]['id'] == myFavoriteServices[i].service_id) {
                        service_details[services[list_service_id]['id']] = services[list_service_id];
                    }
                }
            }
        } else if(catId == "New Services" && newServices.length > 0){
            for (let list_service_id of Object.keys(services)) {
                for(let i = 0; i < newServices.length; i++){
                    let service = newServices[i].service.split("-");
                    var id = service[0].trim();

                    if (services[list_service_id]['id'] == id) {
                        service_details[services[list_service_id]['id']] = services[list_service_id];
                    }
                }
            }
        } else if(catId == "Best sellers" && mainBestSeller.length > 0){
            let main_category = $("#orderform-main-category").val();
            for(let i = 0; i < mainBestSeller.length; i++){
                if(mainBestSeller[i].category_name == main_category){
                    let best_ids = mainBestSeller[i].best_ids.split(" ");
                    let ii = 0;
                    for(index = 0; index < best_ids.length; index++){
                        
                        for (let list_service_id of Object.keys(services)) {
                            if(best_ids[index] == services[list_service_id]['id']){
                                service_details[ii] = services[list_service_id];
                                ii++;
                            }
                        }
                    }

                    // for (let list_service_id of Object.keys(services)) {
                    //     if (best_ids.includes(services[list_service_id]['id'])) {
                    //         service_details[services[list_service_id]['id']] = services[list_service_id];
                    //     }
                    // }
                }
            }
        } else {
            for (let list_service_id of Object.keys(services)) {

                if (services[list_service_id]['cid'] == catId) {
                    service_details[services[list_service_id]['id']] = services[list_service_id];
                }
            }
        }
        
        return service_details;
    };

/******************************* NEW ORDER PAGE END *****************************/
  
  /*$('.custom-tabing .tab-panel h2').click(function(){
      //$(".custom-tabing .tab-panel p").hide();
      $('.custom-tabing .tab-panel h2').removeClass("active");
      if($(this).hasClass("active")){
          $(this).removeClass("active");
      }else{
       $(this).addClass("active");
        }
      $(this).next().slideToggle();
  }); */

  
/************************  FUNCTION FOR USER RATING ***************************/
    function insertOrUpdateVote(user_id, service_id, vote) {
  
        if (user_id == '') {
            user_id = 0;
        }
  
        var formData = {
            "user_id": user_id,
            "service_id": service_id,
            "vote": vote
        }; //Array 
  
        $.ajax({
            url: "https://followizaddons.com/vote/insertOrUpdateVote.php",
            type: "POST",
            dataType: "json",
            cache: false,
            data: formData,
            crossDomain: true,
            success: function(data, textStatus, jqXHR) {
                if(data.status){
                    $("#reviewShowOnly_" + service_id).rating({
                        "value": data.data['voteavg']
                    });
                }
               
            },
            error: function(jqXHR, textStatus, errorThrown) {
            }
        });
    }

    function insertOrUpdateVoteForOrder(user_id, service_id, vote) {
  
        if (user_id == '') {
            user_id = 0;
        }
  
        var formData = {
            "user_id": user_id,
            "service_id": service_id,
            "vote": vote
        }; //Array 
  
        $.ajax({
            url: "https://followizaddons.com/vote/insertOrUpdateVote.php",
            type: "POST",
            dataType: "json",
            cache: false,
            data: formData,
            crossDomain: true,
            success: function(data, textStatus, jqXHR) {
                if(data.status){
                    $(".reviewShowOnly[data-service_id='" + service_id + "']").rating({
                        "value":  data.data['voteavg']
                    })
                }
               
            },
            error: function(jqXHR, textStatus, errorThrown) {
            }
        });
    }
  
    function notExistServiceID(service_id) {
        return;
        var formData = {
            "service_id": service_id,
            "type": "check_service_id"
        }; //Array 
    
        $.ajax({
            url: "https://followizaddons.com/vote/insertOrUpdateVote.php",
            type: "POST",
            dataType: "json",
            cache: false,
            data: formData,
            crossDomain: true,
            success: function(data, textStatus, jqXHR) {
            },
            error: function(jqXHR, textStatus, errorThrown) {
            }
        });
    
    
    }
    
    function getUserRating() {

        $(".review").rating({
            "value": 0,
            "click": function (e) {
                if(typeof e.event !== "undefined"){
                    var service_id = (e.event.target.parentNode.id).split("_")[1];
                    
                    insertOrUpdateVote(user_id, service_id, e.stars);
                    $("#review_" + service_id).rating({
                        "value":e.stars
                    })
                    $("#review_" + service_id).addClass('setted-own');
                }
            },
        });

        $(".reviewShowOnly").rating({
            "value": 3.0,
            "readonly": true
        });

        let data = {user_id: user_id};
        $.ajax({
            url: "https://followizaddons.com/vote/read.php",
            type: "POST",
            dataType: "json",
            data: data,
            cache: false,
            crossDomain: true,
            success: function(response) {
                var user_rating = response.data;

                for (i = 0; i < user_rating.length; i++) {

                    if ($("#review_" + user_rating[i].service_id).length) {
                        
                        $("#review_" + user_rating[i].service_id).rating({
                            "value": user_rating[i].my_vote ? user_rating[i].my_vote : 0
                        });

                        if(user_rating[i].my_vote){
                            $("#review_" + user_rating[i].service_id).addClass("setted-own");
                        }

                    } 

                    if ($("#reviewShowOnly_" + user_rating[i].service_id).length) {
                        $("#reviewShowOnly_" + user_rating[i].service_id).rating({
                            "value": user_rating[i].vote?user_rating[i].vote:3,
                            "readonly": true
                        });
                    }
                }
    
            },
            error: function(jqXHR, textStatus, errorThrown) {
            }
        });
    }

    function getMyFavoriteServices(){
        // get my favorite services vote = 5
        let data = {user_id: user_id};
        jQuery.ajax({
            async: false,
            url: "https://followizaddons.com/vote/myfavorite_services.php",
            type: "POST",
            dataType: "json",
            data: data,
            cache: false,
            crossDomain: true,
            success: function(response) {
                if(response.status){
                    myFavoriteServices = response.data;
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
            }
        });
    }

    function getNewServices(){
        
        $.ajax({
            async: false,
            url: "https://followizaddons.com/client_js/updates/new_services.php",      
            type: "GET",
            dataType: "json",
            cache: false,
            crossDomain: true,
            success: function(response)         
            {
                newServices = response.data;
            }
        });
    }

    function getBestSellers(){
        $.ajax({
            async: false,
            url: "https://followizaddons.com/bestseller/read_bestseller.php",      
            type: "GET",
            dataType: "json",
            cache: false,
            crossDomain: true,
            success: function(response)         
            {
                mainBestSeller = response.data.main;
                subBestSeller = response.data.sub;
                // newServices = response.data;
            }
        });
    }

  /************************  FUNCTION FOR USER RATING ***************************/
  
    function CopyToClipboard(containerid) {
    
        if (document.selection) { 
            
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select().createTextRange();
            document.execCommand("copy"); 
        } else if (window.getSelection) {
        
            var range = document.createRange();
            range.selectNode(document.getElementById(containerid));
            //window.getSelection().addRange(range);
            
            let selection = window.getSelection();
            if (selection.rangeCount > 0) {
                selection.removeAllRanges();
            }
            selection.addRange(range);
        
            document.execCommand("copy")
        }
    }
  
    function thousands_separators(num)
    {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }
    
    function isNotEmpty(val){
        return (val === undefined || val == null || val.length <= 0) ? false : true;
    }
  
    String.prototype.ltrim = function() {
        return this.replace(/^\s+/,"");
    }
        
/**************************** code ot generate invoice ************************************/
    
//need to chang with client server.
    const invoice_api_url = api_end_point + "/invoice/";
  
    function generateInvoice(data){
        $.ajax({
            url: invoice_api_url + "generateInvoice.php",      
            type: "POST",                  
            data:  data,
            success: function(data) {
                var link = document.createElement('a');
                link.href = invoice_api_url + 'get-invoice.php?file_path=' + data.file_path;
                link.download = "invoice.pdf";
                link.click();
                link.remove();
            }
        });
    }
 
/**************************** code for generate invoice ************************************/
   
/**************************** code for ticket rating ***************************************/
    
    const get_agent_url = api_end_point + "/agent/getAgents.php";
    const agent_url = api_end_point + "/agent/";
    const get_agent_ratings_url = api_end_point + "/agent/read.php";

    function getAgents(){
        jQuery.ajax({
            url : get_agent_url,
            type: "GET",
            dataType: "json",
            cache: false,
            crossDomain: true,
            success: function(data, textStatus, jqXHR)
            {
                localStorage.setItem('agents', JSON.stringify(data.data));
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
            }
        });
    }
  
    function getAgentRatings(ticket_id){
      
        if (user_id == '') {
            user_id = 0; 
        }

        var formData = {"user_id":user_id,"ticket_id":ticket_id}; 
        
        jQuery.ajax({
            url : get_agent_ratings_url,
            type: "POST",
            dataType: "json",
            cache: false,
            data :formData,
            crossDomain: true,
            success: function(response, textStatus, jqXHR)
            {
                let agents_rating = response.data;
                for (i = 0; i < agents_rating.length; i++) {              
                    $("#msg_"+ agents_rating[i].msg_id).rating({"value": agents_rating[i].rating });
                } 
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
            }
        });
    }
  
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
    
    function getAgentId(agents,msg_txt){
        var agent_key = '';
            
        for (const [key, agent]  of Object.entries(agents)) {
            
            if(msg_txt.includes(agent) ){
                let agent_k = getKeyByValue(agents,agent);
                agent_key = agent_k;
            }
        }
        
        return agent_key; 
    }
    
    
    function insertOrUpdateTicketRating(user_id, ticket_id, msg_id, agent_id, rating, response_time){
        if (user_id == '') {
            user_id = 0; 
        }

        var formData = { 
            "user_id": user_id, 
            "msg_id": msg_id,
            "agent_id": agent_id,
            "ticket_id": ticket_id,
            "rating": rating,
            "response_time": response_time 
        }; 
    
        jQuery.ajax({
            url : agent_url + "insertOrUpdateAgentRating.php",
            type: "POST",
            dataType: "json",
            cache: false,
            data: formData,
            crossDomain: true,
            success: function(data, textStatus, jqXHR)
            {
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
            }
        });
    }
  
/**************************** code ot agent rating ************************************/
  
  
/**************************** code to get ticket history ************************************/
  
    function responsetime(timestamp1, timestamp2) {
        
        const unixTimeZero1 = Date.parse(timestamp1);
        const unixTimeZero2 = Date.parse(timestamp2);
        
        var difference = unixTimeZero1 - unixTimeZero2;
        var daysDifference = Math.floor(difference/1000/60);
    
        return daysDifference;
    }
  
    function getTicketDetails(link,ticket_id){
        $.get( link, function( data ) {
            $("#ticketInfoHolder").html('');
            $(".ajax-load-ticket" ).html( $(data).find("#messageContainer").clone() );
        
            setTimeout(function(){
                getAgentRatings(ticket_id);
                
                //init blank rating
                if($(".ticketReview").length > 0){
                
                    jQuery(".ticketReview").rating({
                        "value": 0,
                        "click": function (e) {
                            if(typeof e.event !== "undefined"){
                            
                                let askTime =  $(e.event.target).parent().parent().parent().find('.text-muted').html();
                                
                                // let replyTime =  $(e.event.target).find('.text-muted').html();
                                let replyTime =  $(e.event.target).parent().parent().parent().parent().prev().find('.text-muted').html();
                                if(typeof replyTime === 'undefined'){
                                    replyTime = askTime;
                                }
                                
                                var msg_id = (e.event.target.parentNode.id).split("_")[1];
                                var source_id = e.event.target.parentNode.id;
                                var msg_txt = $("#msg_container_"+msg_id).text();
                                let isAgentExit = JSON.parse(localStorage.getItem('agents'));

                                if(isAgentExit == null || isAgentExit == 'undefined'){
                                    getAgents();
                                }

                                let agents = JSON.parse(localStorage.getItem('agents'));
                                
                                var agent_id = getAgentId(agents,msg_txt);
                                if(agent_id == "") { agent_id = 1; }
                                var response_time = responsetime(askTime, replyTime);// seconds
                            
                                if(agent_id != ''){
                                    insertOrUpdateTicketRating(user_id,ticket_id,msg_id,agent_id,e.stars,response_time)
                                }
                            }
                        },
                    });
                }
            }, 200);
            
        });
      
      //setTimeout(function(){getAgentRatings(ticket_id)},1000);
    }

    if(typeof firstTicketId !== 'undefined'){
        let link = site_link + ticketPageURL + firstTicketId;

        getTicketDetails(link, firstTicketId)
        
        $(".ticketList").click(function(e){
            e.preventDefault();

            $(".history_ticket .order_text").html($(this).find("p").html());
            $(".history_ticket .order-id").html($(this).find("p").html());
            $(".history_ticket .order_refill .order_id").html("ID : " + $(this).attr("data-ticketID"));
            $(".history_ticket .order_refill .status_date").html($(this).find(".small_font").html());
            getTicketDetails(site_link + $(this).attr("data-href"), $(this).attr("data-ticketID"));
            
        })
    }

/**************************** code to get ticket history ************************************/

    /************************** code for synchronise user on other server ************/
    
    function synchronisUser(allUsers){
        var users = { ...allUsers }; 
        
        $.ajax({
            type: "POST",
            dataType: "json",
            cache: false,
            data:  { 'users' :  users },
            crossDomain: true,
            url: api_end_point + "/user/insertOrUpdateUser.php",      
            success: function(data)         
            {
            }
        });
    }
    
    function generateAllInvoice(paymentInfo){
        var paymentInfo = { ...paymentInfo }; 
        
        $.ajax({
            type: "POST",
            dataType: "json",
            cache: false,
            data:  { 'payment_info' :  paymentInfo },
            crossDomain: true,
            url: api_end_point + "/invoice/generate-all-invoice.php",      
            success: function(data)         
            {
            }
        });
    }
    
    let count_index = 0;
    function synchronizeService(allServices){
        count_index ++;
        var updates = { ...allServices };
        $.ajax({
            type: "POST",
            dataType: "json",
            cache: false,
            data:  { 'updates' :  updates },
            crossDomain: true,
            url: api_end_point + "/api/update/insertOrUpdateServices.php",
            success: function(data)         
            {
            }
        });
    }
    
    function synchronizeServiceOrder(allServicesOrder){
       
        var serviceOrder = { ...allServicesOrder }; 
        return $.ajax({
            type: "POST",
            dataType: "json",
            cache: false,
            data:  { 'serviceOrder' :  serviceOrder },
            crossDomain: true,
            url: api_end_point + "/api/order/insertOrUpdateServiceSorting.php",
            success: function(data)         
            {
            }
        });
    }
    
    async function processServices(categories){
        let totalCategory = categories.length;;
    
        for(let i = 0; i < totalCategory; i++){
            let category = categories[i];
            let service = category.services;
            let allServices = [];
            service.forEach(function (s) {
                let temArr = [];
                temArr['service_id'] = s.id;
                temArr['service_details'] = s.name;
                temArr['price'] = parseFloat(s.rate.custom);
                temArr['status'] = parseInt(s.status);
                allServices.push({ ...temArr });
            });
            if(allServices.length){
                await synchronizeService(allServices);
            }
        }
    }

    function synchronizeCategoryOrder(allCategoriesOrder){
       
        var categoryOrder = { ...allCategoriesOrder }; 
        return $.ajax({
              type: "POST",
              dataType: "json",
              cache: false,
              data:  { 'categoryOrder' :  categoryOrder },
              crossDomain: true,
              url: api_end_point + "/api/order/insertOrUpdateCategorySorting.php",
              success: function(data)         
              {
              }
          });
    }
    
    async function processCategoryOrder(categories){

        let totalCategory = categories.length;;
     
        let cat_counter = 1;
        let allCategoriesOrder = [];
        for(let i = 0; i < totalCategory; i++){
            let category = categories[i];
    
            //code for service order
            let temArr3 = [];
                
            temArr3['category_id'] = category.id;
            temArr3['sort_order'] = cat_counter;
            
            cat_counter++;
            allCategoriesOrder.push({ ...temArr3 });
    
        }

        await synchronizeCategoryOrder(allCategoriesOrder)
    }  
    
    async function processServicesOrder(categories){
        let totalCategory = categories.length;;
    
        let counter = 1;
        
        
        for(let i = 0; i < totalCategory; i++){
            let category = categories[i];
            let service = category.services;
    
            let allServicesOrder = [];
            service.forEach(function (s) {
                
                let temArr2 = [];
                
                temArr2['service_id'] = s.id;
                temArr2['sort_order'] = counter;
                
                counter++;
                allServicesOrder.push({ ...temArr2 });
            });
            
            if(service.length){
                await synchronizeServiceOrder(allServicesOrder)
            }
            
            // if(i == 1) break;
        }
    }
  
    
   /* if (currentURL.includes("addfunds")) 
    {
      $.get( 'https://www.startdesigns.com/client_js/invoice/user-generate-invoice.php?user_id='+user_id , function( response ) {
          if(response == 0){
            $(".download_icon").remove();
          }else{
            $(".download_icon").css('display','block');
          }
      });	
      
    } */

  
    /************************** end code for synchronise user on  other server ********/
  
  
  
    /**************************** update page code *****************************************/
     /**************************** update page code *****************************************/
   //DO NOT DELETE USED IN FUTURE
   // https://bulkfollows.com/updates
    const updateURL = 'https://followizaddons.com/client_js/updates/index.php';
    var category = "";
    var search = "";
  
    function populatePaginaiton(response) {
        var $pager = $('.table-pagination ul');
        $pager.html('');
        
        if (response.prev_page_url != null) {
           $pager.append("<li><a href='#' onclick=\"loadUpdates('" + response.prev_page_url + "')\" ><i class='fas fa-arrow-left mr-2'></i></a></li>");
        } else {
           $pager.append("<li></li>");
        }
    
        var left = 3,
            right = 3;
        if (response.current_page == 1) right = 6;
        if (response.current_page == 2) right = 5;
        if (response.current_page >= response.last_page) left = 5;
    
        for (var i = 1; i <= response.last_page; i++) {
            var active = "",
                link = "";
            if (i == response.current_page) {
                active = "active";
                link = "#";
            } else {
                link = updateURL + "?search=" + search + "&category=" + category + "&page=" + i;
            }
    
            if (i >= response.current_page - left && i <= response.current_page + right)
                $pager.append("<li class='" + active + "'><a href='#' onclick=\"loadUpdates('" + link + "')\" >" + i + "</a></li>");
        }
    
        if (response.next_page_url != null) {
            $pager.append("<li><a href='#' onclick=\"loadUpdates('" + response.next_page_url + "')\" ><i class='fas fa-arrow-right mr-2'></i></a></li>");
        } else {
            $pager.append("<li></li>");
        }
    }
  
    function filterByCategory(cat) {
        if (cat == '')
            $('#filter').text("All");
        else if (cat == "Notification:gauravbhatra@startdesigns.com")
            $('#filter').text("Notification Enabled");
        else
            $('#filter').text(cat);
        category = cat;
    
        var link = updateURL + "?search=" + search + "&category=" + category;
        loadUpdates(link);
    }

    function loadUpdatesNew(link){
        $.ajax({
            url: link + '?type=main',      
            type: "GET",
            dataType: "json",
            cache: false,
            crossDomain: true,
            success: function(response)         
            {
                $('.table.update-table tbody').html('');
                response.data.forEach(function(data) {
                    var type = "";
                    if (data.update_status == "updates-service-decreased") type = "blue";
                    if (data.update_status == "updates-service-increased") type = "orange";
                    if (data.update_status == "updates-service-enabled" || data.update_status == "updates-service-new") type = "green";
                    if (data.update_status == "updates-service-disabled") type = "danger";

                    var service = data.service.split("-");
                    var id = service[0].trim();

                    var service_name = service.splice(1);
                    service_name = service_name.join('-');
                    
                    var html_row = "<tr class='data-services'>" +
                    "  <td class='text-center'><div class='id-boxi'>" + id + "</div></td>" +
                    "    <td><a href='#' class='updated-service' data-service_id='" + id + "'>" + service_name + "</a></td>" +
                    "    <td>" + data.date + "</td>" +
                    "    <td><span class='color-" + type + "'>" + data.status + "</span></td>" + 
                    "</tr> ";
                    $('#update_all .table.update-table tbody').append("" + html_row); 
                    
                    switch(data.update_status){
                        case 'updates-service-new':
                            $('#update_new .table.update-table tbody').append("" + html_row); 
                            break;
                        case 'updates-service-decreased':
                            $('#update_decrease .table.update-table tbody').append("" + html_row); 
                            break;
                        case 'updates-service-increased':
                            $('#update_increase .table.update-table tbody').append("" + html_row); 
                            break;
                        case 'updates-service-enabled':
                            $('#update_new .table.update-table tbody').append("" + html_row); 
                            break;
                        case 'updates-service-disabled':
                            $('#update_disable .table.update-table tbody').append("" + html_row); 
                            break;
                    }
                });

                $(".updated-service").on('click', function(){
                    let service_id = $(this).attr("data-service_id");
                    $("#order_searchService").val(service_id).trigger('keyup');
                    location.href = "#order_searchService";
                })
                // if($("#table-updates").length > 0){
                
                //     $("#table-updates").after("<div class='text-center'><div class='loadmore btn btn-primary btn-auto' data-current='1' data-total='"+response.totalPage+"'><span>Load more</span></div>");
                // }
                // populatePaginaiton(response);
            }
        });
    }
   
    $(document).on("click",'.loadmore',function(e) {
          var page = parseInt($(this).attr("data-current")) +1;
          var total = parseInt($(this).attr("data-total"));
          if(page == total){
              $(this).hide();
          }
          $(this).attr("data-current",page);
          loadUpdatesPage("https://followizaddons.com/client_js/updates/index.php?_=1643094253933&type=main&page="+page);
    });

    function loadUpdatesPage(link) {
        $.ajax({
            url: link,      
            type: "GET",
            dataType: "json",
            cache: false,
            crossDomain: true,
            success: function(response)         
            {
                //$('.table.update-table tbody').html('');
    
                response.data.forEach(function(data) {
                    var type = "btn-secondary";
    
                    if (data.update.indexOf("Service Enabled") >= 0) type = "enabled";
                    if (data.update.indexOf("Service Disabled") >= 0) type = "disabled";
                    if (data.update.indexOf("Price Increased") >= 0) type = "increased";
                    if (data.update.indexOf("Price Reduced") >= 0) type = "decreased";
                    
                    let previousPrice = '';
                        if(type =="increased"|| type == "decreased"){
                    
                        previousPrice = "<span class='previous_price'> Previously "+ data.old_price +" $</span>";
                    }
                    
                    
                    $('.table.update-table tbody').append("" +
                        "<tr>" +
                        "  <td class='text-center'><div class='id-boxi'>" + data.linked_service.service + "</div></td>" +
                        "    <td>" + data.linked_service.name + "</td>" +
                        "    <td>" + data.updated_at + "</td>" +
                        "    <td class='text-center'><a href='#'  class='btn btn-sm update badge " + type + "'>" + data.update + previousPrice +"</a></td>" +
                        "</tr> "
                    );
                });
                
            }
        });
    }
   
    function loadUpdates(link) {
   
        $.ajax({
            url: link+'?type=main',      
            type: "GET",
            dataType: "json",
            cache: false,
            crossDomain: true,
            success: function(response)         
            {
                $('.table.update-table tbody').html('');
  
                response.data.forEach(function(data) {
                    var type = "btn-secondary";
    
                    if (data.update.indexOf("Service Enabled") >= 0) type = "enabled";
                    if (data.update.indexOf("Service Disabled") >= 0) type = "disabled";
                    if (data.update.indexOf("Price Increased") >= 0) type = "increased";
                    if (data.update.indexOf("Price Reduced") >= 0) type = "decreased";
    
                    let previousPrice = '';
                    let previousPrice1 = '';
                    if(type =="increased"|| type == "decreased"){
                        //previousPrice = "<span class='previous_price'> Previously "+ data.old_price +" $</span>";
                        previousPrice1 = "<br><span class='previous_price1'> Previously "+ data.old_price +" $</span>";
                    }
                    
                    let htmlData = "<td class='text-center '><a href='#' class='btn btn-sm update "+type+" badge'>" + data.update + previousPrice +"</a></td>";
                    if(data.status == "0"){
                        htmlData = "<td class='text-center  '><a href='#'  class='btn btn-sm update "+type+" badge'>Service Disabled</a></td>";
                    }
                    
                    $('.table.update-table tbody').append("" +
                        "<tr class='data-services'>" +
                        "  <td class='text-center'><div class='id-boxi'>" + data.linked_service.service + "</div></td>" +
                        "    <td>" + data.linked_service.name +" - "+ data.price +"$ "+previousPrice1+"</td>" +
                        "    <td>" + data.updated_at + "</td>" +
                        "    " +htmlData+
                        "</tr> "                                                   
                    ); 
                    
                    
                });
                if($("#table-updates").length > 0){
                
                    $("#table-updates").after("<div class='text-center'><div class='loadmore btn btn-primary btn-auto' data-current='1' data-total='"+response.totalPage+"'><span>Load more</span></div>");
                }
                populatePaginaiton(response);
            }
        });
    }
  
    
    /********************************************** code for api copy ***************************/
    
    $(document).on("click",'#api_copy', function(e){
        e.preventDefault();
        document.getElementById('api_key').select();
    
        var copied;
    
        try {
            // Copy the text
            copied = document.execCommand('copy');
        } catch (ex) {
            copied = false;  
        }
    
        if(copied){
            document.getElementById('show'); 
        }
        
    });
  
//   });//documentready
  
  
  
  /******************* DARK MODE  *******************************/
  
    $(document).ready(function () {
    
        let ordersuccesscount = localStorage.getItem('ordersuccesscount');
        
        if(ordersuccesscount == 2){
            localStorage.removeItem("ordersuccesscount");
            localStorage.removeItem("main-category");
            localStorage.removeItem("category");
            localStorage.removeItem("service");
        }
        
        if(ordersuccesscount == 1){
            localStorage.setItem('ordersuccesscount',2);
        }
    
     /*if (currentURL.includes('addfunds')) {*/
        try {
            //for price
            // https://api.bigdatacloud.net/data/client-ip //free
            //https://www.bigdatacloud.com/country-info-apis/country-by-ip-address-api // paid
        
            let getUserIpLink = "https://api.bigdatacloud.net/data/client-ip";
            $.get( getUserIpLink, function( ipInfo ) {
                let userIp = ipInfo.ipString;
                let apiKey = "e7afcefe97274d78b1405526be011623"; //need to replace with paid one
                let getUserCountryInfoLink = "https://api.bigdatacloud.net/data/country-by-ip?ip="+userIp+"&key="+apiKey;
        
                $.get( getUserCountryInfoLink, function( countryInfo ) {
                    if(countryInfo.hasOwnProperty('country')){
                        let country = countryInfo.country;
                        if(country.hasOwnProperty('isoName')){
                        if(country.isoName !== "Canada"){
                            $('.addfund_page').css('display','block');
                            $('.deposit_toltip').remove();
                            $('.badgeLink').css('display','inline-flex');
                            $('.badgeBtn').css('display','none');
                        }else{
                            if (currentURL.includes('addfunds')) {
                            window.location.href = homeURL;
                            }
                            $('.deposit_toltip').html("Deposits are blocked for Canadian users.");
                            $('.badgeBtn').css('display','inline-flex');
                            $('.badgeLink').css('display','none');
                        }
                        }else{
                            if (currentURL.includes('addfunds')) {
                            window.location.href = homeURL;
                            }
                        $('.deposit_toltip').html("Deposits are blocked for Canadian users.");
                        }
                    }else{
                        if (currentURL.includes('addfunds')) {
                            window.location.href = homeURL;
                        }
                        $('.deposit_toltip').html("Deposits are blocked for Canadian users.");
                    }
                });
            });
        }catch(err) {
            window.location.href = homeURL;
        }
   
   /* } */

        jQuery('#field-orderform-fields-quantity').ForceNumericOnly();
    });
        
     
    
   /******************************** Code to get user location *************************/

    /***************** For social midea icons ****************/
    
    
    function checkIfImageExists(url, callback) {
        const img = new Image();
        img.src = url;
        
        if (img.complete) {
            callback(true);
        } else {
            img.onload = () => {
                callback(true);
            };
            img.onerror = () => {
                callback(false);
            };
        }
    }
    
   // listen for keyups in both input widget AND dropdown

    
    /************************** code for synchronise user on other server ************/
  
    function getAllUsers(pageNumber){
        pageNumber = pageNumber+1;
        let url = 'https://followiz.com/admin/api/users/list?page=' + pageNumber;
        return $.ajax({
            url : url,
            method : 'GET',
            json : true
        });
  
    }
    
    function getUserDetails(UserId){
        let url = 'https://followiz.com/admin/api/users/view/'+UserId;
        return $.ajax({
            async:false,
            url : url,
            method : 'GET',
            json : true
        });
    }
    
    async function processUsersDetails(allUsers){
        let result;
        let newAllUsers = [];
        let promises = [];
        
        let totalUsers = allUsers.length;
        for(let i = 0; i < totalUsers; i++){
            promises.push(getUserDetails(allUsers[i]['followiz_id']));
        }
        result = await Promise.all(promises);
  
        for(let i = 0; i < totalUsers; i++){
         
          let tempUser = result[i].data;
          
          allUsers[i]['first_name'] = tempUser.first_name;
          allUsers[i]['last_name'] = tempUser.last_name;
          newAllUsers.push({ ...allUsers[i] });
                
        }
        //save user to other server
        synchronisUser(newAllUsers);
    }
  
    async function processUsers(totalPage){
        let result;
        let promises = [];
        let allUsers = [];
  
        for(let i = 0; i < totalPage; i++){
            promises.push(getAllUsers(i));
           //result[i] = getAllUsers(i);
        }
        
        result = await Promise.all(promises);
        for(let i = 0; i < totalPage; i++){
  
            let tempUser = result[i].data.users;
            tempUser.forEach(function (u) {
                let temArr = [];
                temArr['followiz_id'] = u.id;
                temArr['username'] = u.username;
                temArr['email'] = u.email;
                allUsers.push(temArr);
                //allUsers.push(temArr);
            });
        }
        //save user to other server
        //synchronisUser(allUsers);
        processUsersDetails(allUsers);
    }
    
    /************************** end code for synchronise user on  other server ********/
  
    /********************************************** code for api copy ***************************/
   
    jQuery.fn.ForceNumericOnly = function() {
        return this.each(function()
        {
            $(this).keydown(function(e)
            {
                var key = e.charCode || e.keyCode || 0;
                // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
                // home, end, period, and numpad decimal
                return (
                    key == 8 || 
                    key == 9 ||
                    key == 13 ||
                    key == 46 ||
                    key == 110 ||
                    key == 190 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105));
            });
        });
    };
    
    function getUserRatingForOrder() {
        // Orders page, 
        console.log("Orders page");
       
        $(".review").rating({
            "value": 0,
            "click": function (e) {  
                if(typeof e.event !== "undefined"){
                    var order_id = (e.event.target.parentNode.id).split("_")[1];
                    var service_id = $("#review_" + order_id).attr('data-service_id');
                    
                    insertOrUpdateVoteForOrder(user_id, service_id, e.stars);
                    
                    setTimeout(function(){
                        $(".review[data-service_id='" + service_id + "']").each(function(){
                            $(this).rating({
                                value: e.stars
                            })
                            $(this).addClass('setted-own');
                        })
                    }, 100)
                   
                }
            },
        });

        $(".reviewShowOnly").rating({
            "value": 3,
            "readonly": true
        });

        let data = {user_id: user_id};
        jQuery.ajax({
            url: "https://followizaddons.com/vote/read.php",
            type: "POST",
            dataType: "json",
            data: data,
            cache: false,
            crossDomain: true,
            success: function(response) {
                var user_rating = response.data;
                for (i = 0; i < user_rating.length; i++) {

                    $(".review").each(function(){
                        if($(this).attr('data-service_id') == user_rating[i].service_id){
                            $(this).rating({
                                "value": user_rating[i].my_vote ? user_rating[i].my_vote : 0,
                            });

                            if(user_rating[i].my_vote){
                                $(this).addClass("setted-own");
                            }
                        }
                       
                    })

                    $(".reviewShowOnly").each(function(){
                        if($(this).attr('data-service_id') == user_rating[i].service_id){
                            $(this).rating({
                                "value": user_rating[i].vote ? user_rating[i].vote : 0,
                                "readonly": true
                            });
                        }
                    })
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
            }
        }); 
    }

    function review_hover(){
        $(".review-hover-zone").mouseover(function(event){
            let classname = event.target.parentNode.className;
            if(classname.search(new RegExp("review", "i")) < 0){
                $(".review").css("display", "block");
                $(".reviewShowOnly").css("display", "none");
            }
        })

        $(".review-hover-zone").mouseout(function(event){
            let classname = event.target.parentNode.className;
            if(classname.search(new RegExp("review", "i")) < 0){
                $(".review").css("display", "none");
                $(".reviewShowOnly").css("display", "block");
            }
        })
    } 


    // affiliate page
    function copyToClipboard(){
        var link = $("#referral_link").html();
        navigator.clipboard.writeText(link);
    }
    // child page
    function copyToClipboard1(param){
        var link = "";
        if(param == 1)
            link = $("#referral_link1").html();
        else
            link = $("#referral_link2").html();
        navigator.clipboard.writeText(link);
    }