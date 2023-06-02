$(document).ready(function () {
      Allitem();
      itdata();
      $('.selection').select2({
            closeOnSelect: true
      });

      var baseurl = document.getElementById('url').innerHTML;
      $("body").on("click", ".addnewitem", function () {
            var itemid = $(this).attr("data-id");

            if (itemid == 0) {
                  $('#item_form-validate').validate();
                  itemreset()
                  $('#createitem').attr('data-id', itemid)
                  $('#itemimage').attr('value', 'AdminLTELogo.png');
                  document.getElementById('itemlablename').innerHTML = "Add Item";
                  $('#createitem').addClass('show').removeClass('hide');
            }
            else {
                  $.ajax({
                        url: "" + api + "find_mst_item",
                        type: "GET",
                        data: {
                              id: itemid,
                              type: "ALL"
                        },
                        cache: false,
                        success: function (data) {
                              objdata = JSON.stringify(data.data)
                              objectdata = JSON.parse(objdata)
                              $('#createitem').attr('data-id', objectdata[0].id)
                              $('#itemrate').val(objectdata[0].SaleRate);
                              $('#igstper').val(objectdata[0].IGSTPer);
                              $('#cgstper').val(objectdata[0].CGSTPer);
                              $('#sgstper').val(objectdata[0].SGSTPer);
                              $('#igstrate').val(objectdata[0].IGSTRate);
                              $('#itmcgstrate').val(objectdata[0].CGSTRate);
                              $('#itmsgstrate').val(objectdata[0].SGSTRate);
                              $("#itmrate").val(objectdata[0].TotalRate);
                              document.getElementById('itemname').value = objectdata[0].ItemName;
                              document.getElementById('itemremark').value = objectdata[0].Remark;
                              $("#itemcode").val(objectdata[0].ItemCode)
                              ISactive = objectdata[0].ISActive;
                              $('#category').val(objectdata[0].ItemGroup_ID);
                              $('#category').select2().trigger('change');
                              $('#itemcounter').val(objectdata[0].counter_id);
                              $('#itemcounter').select2().trigger('change');
                              if (ISactive == 1) {
                                    $('#itemstatus').val(1);
                                    $('#itemstatus').select2().trigger('change');
                              }
                              else {
                                    $('#itemstatus').val(0);
                                    $('#itemstatus').select2().trigger('change');
                              }
                              var imageurl = baseurl + '/images/itemimage/' + objectdata[0].BigImage1;
                              $('#itmimg_url').attr('src', imageurl);
                              $('#itemimage').attr('value', objectdata[0].BigImage1);
                              document.getElementById('itemlablename').innerHTML = "Edit item - #" + objectdata[0].id + "";
                              $('#createitem').addClass('show').removeClass('hide');
                        }

                  })
            }
      });

      $("body").on("click", ".deleteitem", function () {
            var itemid = $(this).attr("data-value");
            swal.fire({
                  title: "Delete",
                  text: "Are Sure You Want To Delete This Item ?",
                  type: "warning",
                  buttonsStyling: true,
                  showCancelButton: true,
                  confirmButtonText: "Yes",
                  cancelButtonText: "No",
                  closeOnConfirm: false,
                  closeOnCancel: false,
                  showLoaderOnConfirm: true
            }).then(function (result) {
                  if (result.value) {
                        $.ajax({
                              url: "" + api + "delete_mst_item",
                              type: "GET",
                              data: {
                                    id: itemid
                              },
                              success: function () {
                                    toastr.success('Item Deleted Successfull');
                                    setTimeout(() => {
                                          itdata();
                                    }, 500);
                              }
                        })
                  } else {
                        swal.close();
                  }
            });
      });

      $('.closecreateitem').click(function () {
            $('#createitem').addClass('hide').removeClass('show');
      });

      $('body').on('click', '#itemcheckbox', function () {
            var statusid = $(this).attr("for");
            if ($('#' + statusid + '.itemcheck').prop('checked') == false) { 
                  $('#' + statusid + '.itemcheck').prop('checked', true);                      
                  updateItemStatus(statusid, $('#' + statusid + '.itemcheck').prop('checked'));
            }                                                                                  
            else {                                               
                  $('#' + statusid + '.itemcheck').prop('checked', false);
                  updateItemStatus(statusid, $('#' + statusid + '.itemcheck').prop('checked'));
            }
      });

      function generateHierarchyCode(dInput) {
            dInput = dInput.replace(/[_\W]+/g, "_")
            dInput = dInput.toUpperCase();
            $("#itemcode").val(dInput)
      };

      $("#itemname").keyup(function () {
            generateHierarchyCode(this.value);
      });

      $("#itemname").change(function () {
            generateHierarchyCode(this.value);
      });

      $('#saveitem').click(function () {
            $('#item_form-validate').validate();
            if ($('#item_form-validate').valid()) {
                  Createitem();
            }
      });
});

function itdata() {
      var baseurl = document.getElementById('url').innerHTML;
      var t = $('#mst_itemtbl').DataTable({
            "responsive": true,
            "autoWidth": false,
            "aaSorting": [],
            "bDestroy": true,
            columnDefs: [{
                  searchable: false,
                  orderable: false,
                  targets: 0,
            },],
            "pageLength": 10,
            "ajax": {
                  "url": "" + api + "find_mst_item",
                  "type": "GET",
                  "data": function (d) {
                        d.type = "ALL"
                  },
                  "cashe": false,
            },
            'columns': [{
                  "data": "id"
            },
            {
                  "data": null,
                  "render": function (data, type, full, meta) {
                        var images = full.BigImage1;
                        return '<img src="' + baseurl + '/images/itemimage/' + images + '" style="width:30px; height:30px">';
                  }
            },
            {
                  "data": "ItemName"
            },
            {
                  "data": "ItemCode"
            },
            {
                  "data": "ItemGroup_ID"
            },
            {
                  "data": "counter_id"
            },
            {
                  "data": "TotalRate"
            },
            {
                  "data": null,
                  "render": function (data, type, full, meta) {
                        var buttonID = full.id;
                        if (data.ISActive == 1) {
                              return '<input class="slider-v1-input itemcheck" type="checkbox" id="' + buttonID + '" checked><label class="slider-v1" for="' + buttonID + '" id="itemcheckbox"></label>';
                        }
                        else {
                              return '<input class="slider-v1-input itemcheck" type="checkbox" id="' + buttonID + '" onchange="updateItemStatus(' + buttonID + ', ' + $(this).is(':checked') + ')" ><label class="slider-v1" for="' + buttonID + '" id="itemcheckbox"></label>';
                        }
                  },
            },
            {
                  "data": null,
                  "render": function (data, type, full, meta) {
                        var buttonID = full.id;
                        return '<a href="javascript:void(0)" class="btn btn-sm btn-success b-none bg-lightbrown white addnewitem" title="Edit User product" id="addnewitem" data-id="' + buttonID + '"><i class="fas fa-edit"></i></a><a href="javascript:void(0)" class="btn btn-sm btn-success b-none bg-lightbrown white deleteitem ms-2" title="Delete User product" id="deleteitem" data-value="' + buttonID + '"> <i class="fas fa-trash"></i></a>';
                  },
            }],
      });

      t.on('order.dt search.dt', function () {
            let i = 1;
            t.cells(null, 0, {
                  search: 'applied',
                  order: 'applied'
            }).every(function (cell) {
                  this.data(i++);
            });
      }).draw();
};

function Allitem() {
      $('#mst_item').click(function () {
            $('#allitem').show();
      });
      $('.closemstitem').click(function () {
            $('#allitem').hide();
      });
      $(["aria-controls=mst_itmcategory"]).addClass('page-link');
};

function Createitem() {


      var files = $('#itemimage')[0].files;
      var image = files[0].name
      var itemid = $('#createitem').attr('data-id');
      var itemname = $('#itemname').val();
      var itemcode = $('#itemcode').val();
      var status = $('#itemstatus').find(":selected").val();
      var category = $('#category').find(":selected").val();
      var counter = $('#itemcounter').find(":selected").val();
      var remark = $('#itemremark').val();
      var salerate = $('#itemrate').val();
      var igstper = $('#igstper').val();
      var cgstper = $('#cgstper').val();
      var sgstper = $('#sgstper').val();
      var igstrate = $('#igstrate').val();
      var cgstrate = $('#itmcgstrate').val();
      var sgstrate = $('#itmsgstrate').val();
      var totalrate = $('#itmrate').val();
      if (itemid == 0) {
            $.ajax({
                  url: "" + api + "create_mst_item",
                  type: "POST",
                  data: {
                        counterid: counter,
                        itemname: itemname,
                        itemcode: itemcode,
                        categoryid: category,
                        igster: igstper,
                        cgstper: cgstper,
                        sgstper: sgstper,
                        SaleRate: salerate,
                        igstrate: igstrate,
                        cgstrate: cgstrate,
                        sgstrate: sgstrate,
                        totalrate: totalrate,
                        isactive: status,
                        Remark: remark,
                        filename: files
                  },
                  processData: true,
                  cashe: false,
                  success: function () {
                        $('#createitem').addClass('hide').removeClass('show');
                        toastr.success('New Item Add successfull');
                        setTimeout(() => {
                              itdata();
                        }, 500);
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                        alert('Error: ' + jqXHR.status + '\n' + errorThrown);
                  },
            });
      }
      else {
            $.ajax({
                  url: "" + api + "create_mst_item",
                  type: "POST",
                  data: {
                        id: itemid,
                        counterid: counter,
                        itemname: itemname,
                        itemcode: itemcode,
                        categoryid: category,
                        igster: igstper,
                        cgstper: cgstper,
                        sgstper: sgstper,
                        SaleRate: salerate,
                        igstrate: igstrate,
                        cgstrate: cgstrate,
                        sgstrate: sgstrate,
                        totalrate: totalrate,
                        isactive: status,
                        Remark: remark,
                        filename: image
                  },
                  cashe: false,
                  success: function () {
                        $('#createitem').addClass('hide').removeClass('show');
                        toastr.success('Item Updated Successfull');
                        setTimeout(() => {
                              itdata();
                        }, 500);
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                        alert('Error: ' + jqXHR.status + '\n' + errorThrown);
                  },
            });
      }
};

function preview(input, previewDom) {
      var baseurl = document.getElementById('url').innerHTML;
      if (input.files && input.files[0]) {
            $(previewDom).show();
            var reader = new FileReader();
            reader.onload = function (e) {
                  $(previewDom).find('.img').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
      } else {
            $(previewDom).find('.img').attr('src', ' ' + baseurl + '/images/itemimage/AdminLTELogo.png');
      }
}

window.updateItemStatus = (id, ISActive) => {
      if (ISActive == false) {
            $.ajax({
                  url: "" + api + "update_itemstatus",
                  type: "POST",
                  data: {
                        id: id,
                        ISActive: "0"
                  },
                  cache: false,
                  success: function () {
                        toastr.success('Item Status Deactive');
                  }
            })
      }
      else {
            $.ajax({
                  url: "" + api + "update_itemstatus",
                  type: "POST",
                  data: {
                        id: id,
                        ISActive: "1"
                  },
                  cache: false,
                  success: function () {
                        toastr.success('Item Status Active');
                  }
            })
      }
};

$(document).ready(function () {
      toastr.options = {
            'closeButton': true,
            'debug': false,
            'newestOnTop': false,
            'progressBar': false,
            'positionClass': 'toast-top-right',
            'preventDuplicates': false,
            'showDuration': '500',
            'hideDuration': '500',
            'timeOut': '5000',
            'extendedTimeOut': '500',
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut',
      }
});

$(document).ready(function () {
      $.ajax({
            url: "" + api + "find_mst_counter",
            type: "GET",
            data: {
                  type: "ACTIVE"
            },
            success: function (data) {
                  objdata = JSON.stringify(data.data)
                  objectdata = JSON.parse(objdata)
                  for (var i = 0; i < objectdata.length; i++) {
                        mark = `<option value="${objectdata[i].id}">${objectdata[i].counter_name}</option>`;
                        document.querySelector('#itemcounter').insertAdjacentHTML('beforeend', mark);
                  }
            }
      })
});

$(document).ready(function () {
      $.ajax({
            url: "" + api + "find_mst_itemgroup",
            type: "GET",
            data: {
                  type: "ACTIVE"
            },
            success: function (data) {
                  objdata = JSON.stringify(data.data)
                  objectdata = JSON.parse(objdata)
                  for (var i = 0; i < objectdata.length; i++) {
                        mark = `<option value="${objectdata[i].id}">${objectdata[i].ItemGroupName}</option>`;
                        document.querySelector('#category').insertAdjacentHTML('beforeend', mark);
                  }
            }
      })
});

function setgstrate() {
      var salerate = parseFloat(document.getElementById("itemrate").value).toFixed(2);
      var igstper = parseFloat(document.getElementById("igstper").value).toFixed(2);
      var sgstper = parseFloat(document.getElementById("sgstper").value).toFixed(2);
      var cgstper = parseFloat(document.getElementById("cgstper").value).toFixed(2);
      var igstrate = parseFloat(document.getElementById("igstrate").value).toFixed(2);
      var sgstrate = parseFloat(document.getElementById("itmsgstrate").value).toFixed(2);
      var cgstrate = parseFloat(document.getElementById("itmcgstrate").value).toFixed(2);

      if (document.getElementById("igstper").value != null || document.getElementById("igstper").value != 0) {
            document.getElementById("cgstper").value = parseFloat(document.getElementById("igstper").value).toFixed(2) / 2;
            document.getElementById("sgstper").value = parseFloat(document.getElementById("igstper").value).toFixed(2) / 2;

            igstcal = salerate * igstper / 100;
            document.getElementById("igstrate").value = parseFloat(igstcal).toFixed(2);

            sgstcal = salerate * (igstper / 2) / 100;
            document.getElementById("itmsgstrate").value = parseFloat(sgstcal).toFixed(2);

            cgstcal = salerate * (igstper / 2) / 100;
            document.getElementById("itmcgstrate").value = parseFloat(cgstcal).toFixed(2);
      }

};

function setTotalrate() {
      var salerate = parseFloat(document.getElementById("itemrate").value);
      var igstrate = parseFloat(document.getElementById("igstrate").value);
      if (igstrate == ' ') {
            document.getElementById("itmrate").value = parseFloat(salerate).toFixed(2);
      }
      else {
            var TotalAmount = salerate + igstrate;
            document.getElementById("itmrate").value = parseFloat(TotalAmount).toFixed(2);
      }

};

function itemreset() {
      var baseurl = document.getElementById('url').innerHTML;
      $('#item_form-validate').trigger("reset");
      $('#itemstatus').select2("val", "1");
      $('#category').val("");
      $('#category').select2().trigger('change');
      $('#itemcounter').val("");
      $('#itemcounter').select2().trigger('change');
      $('#itmimg_url').attr('src', ''+ baseurl +'/images/itemimage/AdminLTELogo.png');
};