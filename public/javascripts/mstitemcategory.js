$(document).ready(function () {
      Allitemcat()
      dataitem();
      $('#categorystatus').select2({
            closeOnSelect: true
      });

      var baseurl = document.getElementById('url').innerHTML;
      $("body").on("click", ".addnewcategory", function () {
            var categoryid = $(this).attr("data-id");
            if (categoryid == 0) {
                  categoryreset();
                  $('#createcategory').attr('data-id', categoryid)
                  $("#categorycode").val("")
                  $('#categoryimage').attr('value', 'AdminLTELogo.png');
                  document.getElementById('categorylablename').innerHTML = "Add Category";
                  $('#createcategory').addClass('show').removeClass('hide');
            }
            else {
                  $.ajax({
                        url: "" + api + "find_mst_itemgroup",
                        type: "GET",
                        data: {
                              id: categoryid,
                              type: "ALL"
                        },
                        cache: false,
                        success: function (data) {
                              objdata = JSON.stringify(data.data);
                              objectdata = JSON.parse(objdata);
                              $('#createcategory').attr('data-id', objectdata[0].id);
                              document.getElementById('categoryname').value = objectdata[0].ItemGroupName;
                              document.getElementById('categoryremark').value = objectdata[0].Remark;
                              $("#categorycode").val(objectdata[0].ItemGroupCode)
                              ISactive = objectdata[0].ISActive;
                              if (ISactive == 1) {
                                    $('#categorystatus').val(1);
                                    $('#categorystatus').select2().trigger('change');
                              }
                              else {
                                    $('#categorystatus').val(0);
                                    $('#categorystatus').select2().trigger('change');
                              }
                              var imageurl = baseurl + '/images/' + objectdata[0].Image
                              $('#hiddenimagename').text(objectdata[0].Image)
                              $('#img_url').attr('src', imageurl);
                              $('#categoryimage').attr('value', objectdata[0].Image);
                              document.getElementById('categorylablename').innerHTML = "Edit Category - #" + objectdata[0].id + "";
                              $('#createcategory').addClass('show').removeClass('hide');
                        }

                  })
            }
      })

      $("body").on("click", ".deletecategory", function () {
            var categoryid = $(this).attr("data-value");
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
                              url: "" + api + "delete_mst_category",
                              type: "GET",
                              data: {
                                    id: categoryid
                              },
                              success: function () {
                                    toastr.success('Category Deleted Successfull');
                                    setTimeout(() => {
                                          dataitem();
                                    }, 500);
                              }
                        })
                  } else {
                        swal.close();
                  }
            });
      });

      $('.closecreatecategory').click(function () {
            $('#createcategory').addClass('hide').removeClass('show');
      })


      $('body').on('click', '#categorycheckbox', function () {
            var statusid = $(this).attr("for");
            if ($('#' + statusid + '.categorycheck').prop('checked') == false) {
                  $('#' + statusid + '.categorycheck').prop('checked', true);
                  updateCategoryStatus(statusid, $('#' + statusid + '.categorycheck').prop('checked'))
            }
            else {
                  $('#' + statusid + '.categorycheck').prop('checked', false);
                  updateCategoryStatus(statusid, $('#' + statusid + '.categorycheck').prop('checked'))
            }
      });

      function generateHierarchyCode(dInput) {
            dInput = dInput.replace(/[_\W]+/g, "_")
            dInput = dInput.toUpperCase();
            $("#categorycode").val(dInput)
      }

      $("#categoryname").keyup(function () {
            generateHierarchyCode(this.value);
      });

      $("#categoryname").change(function () {
            generateHierarchyCode(this.value);
      });

      $('#cate_form-validate').submit(function (e) {
            $('#cate_form-validate').validate();
            e.preventDefault();

            var cateid = $('#createcategory').attr('data-id');
            var form = $(this);
            console.log(form);
            if (cateid == 0) {
                  $.ajax({
                        url: "" + api + "create_mst_itemgroup",
                        type: "POST",
                        data: form.serialize() + '&id=' + cateid + '&filename=' + categoryimage.files[0].name,
                        cashe: false,
                        success: function (data) {
                              console.log(data);
                              $('#createcategory').addClass('hide').removeClass('show')
                              toastr.success('New Category Add successfull');
                              setTimeout(() => {
                                    dataitem();
                              }, 500);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                              alert('Error: ' + jqXHR.status + '\n' + errorThrown);
                        },
                  })
            }
            else {
                  $.ajax({
                        url: "" + api + "create_mst_itemgroup",
                        type: "POST",
                        data: form.serialize() + '&id=' + cateid + '&filename=' + categoryimage.files[0].name,
                        cashe: false,
                        success: function (data) {
                              console.log(data);
                              $('#createcategory').addClass('hide').removeClass('show');
                              toastr.success('Category Updated Successfull');
                              setTimeout(() => {
                                    dataitem();
                              }, 500);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                              alert('Error: ' + jqXHR.status + '\n' + errorThrown);
                        },
                  })
            }
      })
})

function dataitem() {
      var baseurl = document.getElementById('url').innerHTML;
      var t = $('#mst_itmcategory').DataTable({
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
                  "url": "" + api + "find_mst_itemgroup",
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
                  "render": function (data, type, full) {
                        var images = full.Image;
                        return '<img src="' + baseurl + '/images/' + images + '" style="width:30px; height:30px">'
                  }
            },
            {
                  "data": "ItemGroupName"
            },
            {
                  "data": "ItemGroupCode"
            },
            {
                  "data": "Remark"
            },
            {
                  "data": null,
                  "render": function (data, type, full) {
                        var buttonID = full.id;
                        if (data.ISActive == 1) {
                              return '<input class="slider-v1-input categorycheck" type="checkbox" id="' + buttonID + '" checked><label class="slider-v1" for="' + buttonID + '" id="categorycheckbox"></label>';
                        }
                        else {
                              return '<input class="slider-v1-input categorycheck" type="checkbox" id="' + buttonID + '" onchange="updateCategoryStatus(' + buttonID + ', ' + $(this).is(':checked') + ')" ><label class="slider-v1" for="' + buttonID + '" id="categorycheckbox"></label>';
                        }
                  },
            },
            {
                  "data": null,
                  "render": function (data, type, full) {
                        var buttonID = full.id;
                        return '<a href="javascript:void(0)" class="btn btn-sm btn-success b-none bg-lightbrown white addnewcategory" title="Edit User product" id="addnewcategory" data-id="' + buttonID + '"><i class="fas fa-edit"></i></a><a href="javascript:void(0)" class="btn btn-sm btn-success b-none bg-lightbrown white deletecategory ms-2" title="Delete User product" id="deletecategory" data-value="' + buttonID + '"> <i class="fas fa-trash"></i></a>';
                  },
            }],
      });

      t.on('order.dt search.dt', function () {
            let i = 1;
            t.cells(null, 0, {
                  search: 'applied',
                  order: 'applied'
            }).every(function () {
                  this.data(i++);
            });
      }).draw();
};

function Allitemcat() {
      $('#mst_category').click(function () {
            $('#allitemcat').show()
      })
      $('.closetbl').click(function () {
            $('#allitemcat').hide()
      })
      $(["aria-controls=mst_itmcategory"]).addClass('page-link');
}

// function Createcategory() {
//       var files = $('#categoryimage')[0].files;
//       console.log(files);
//       var image = files[0].name
//       var cateid = $('#createcategory').attr('data-id');
//       var categoryname = $('#categoryname').val();
//       var status = $('#categorystatus').find(":selected").text();
//       var remark = $('#categoryremark').val();
//       var category = $('#categorycode').val();
//       if (cateid == 0) {
//             $.ajax({
//                   url: "" + api + "create_mst_itemgroup",
//                   type: "POST",
//                   data: {
//                         Categorycode: category,
//                         ISactive: status,
//                         ItemGroupName: categoryname,
//                         Remark: remark,
//                         filename: image
//                   },
//                   cashe: false,
//                   success: function () {
//                         $('#createcategory').addClass('hide').removeClass('show')
//                         toastr.success('New Category Add successfull');
//                         setTimeout(() => {
//                               dataitem();
//                         }, 500);
//                   },
//                   error: function (jqXHR, textStatus, errorThrown) {
//                         alert('Error: ' + jqXHR.status + '\n' + errorThrown);
//                   },
//             })
//       }
//       else {
//             $.ajax({
//                   url: "" + api + "create_mst_itemgroup",
//                   type: "POST",
//                   data: {
//                         Categorycode: category,
//                         id: cateid,
//                         ISactive: status,
//                         ItemGroupName: categoryname,
//                         Remark: remark,
//                         filename: image
//                   },
//                   cashe: false,
//                   success: function () {
//                         $('#createcategory').addClass('hide').removeClass('show');
//                         toastr.success('Category Updated Successfull');
//                         setTimeout(() => {
//                               dataitem();
//                         }, 500);
//                   },
//                   error: function (jqXHR, textStatus, errorThrown) {
//                         alert('Error: ' + jqXHR.status + '\n' + errorThrown);
//                   },
//             })
//       }
// }

function previewImage(input, previewDom) {
      var baseurl = document.getElementById('url').innerHTML;
      if (input.files && input.files[0]) {
            $(previewDom).show();
            var reader = new FileReader();
            reader.onload = function (e) {
                  $(previewDom).find('.imagepreview').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
      } else {
            $(previewDom).find('.imagepreview').attr('src', ' ' + baseurl + '/images/AdminLTELogo.png');
      }
}

window.updateCategoryStatus = (id, ISActive) => {
      if (ISActive == false) {
            $.ajax({
                  url: "" + api + "update_categorystatus",
                  type: "POST",
                  data: {
                        id: id,
                        ISActive: "0"
                  },
                  cache: false,
                  success: function () {
                        toastr.success('Category Status Deactive');
                  }
            })
      }
      else {
            $.ajax({
                  url: "" + api + "update_categorystatus",
                  type: "POST",
                  data: {
                        id: id,
                        ISActive: "1"
                  },
                  cache: false,
                  success: function () {
                        toastr.success('Category Status Active');
                  }
            })
      }
}

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

function categoryreset() {
      var baseurl = document.getElementById('url').innerHTML;
      $('#img_url').attr('src', '' + baseurl + '/images/AdminLTELogo.png');
      $('#cate_form-validate').trigger("reset");
      $('#categorystatus').select2("val", "1");
}