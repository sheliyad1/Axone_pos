$(document).ready(function () {
      Allcounter()
      datacounter();

      $('#counterprinter').select2({
            closeOnSelect: true
      });

      $('#counterstatus').select2({
            closeOnSelect: true
      });

      $("body").on("click", ".addnewcounter", function () {
            var counterid = $(this).attr("data-id");
            if (counterid == 0) {
                  counterreset()
                  $('#createcounter').attr('data-id', counterid)
                  document.getElementById('counterlablename').innerHTML = "Add Counter";
                  $('#createcounter').addClass('show').removeClass('hide');
            }
            else {
                  $.ajax({
                        url: "" + api + "find_mst_counter",
                        type: "GET",
                        data: {
                              id: counterid,
                              type: "ALL"
                        },
                        cache: false,
                        success: function (data) {
                              objdata = JSON.stringify(data.data)
                              objectdata = JSON.parse(objdata)
                              $('#createcounter').attr('data-id', objectdata[0].id)
                              document.getElementById('countername').value = objectdata[0].counter_name;
                              document.getElementById('counterremark').value = objectdata[0].remark;
                              $("#countercode").val(objectdata[0].code)
                              $('#counterprinter').val(objectdata[0].printer_id);
                              $('#counterprinter').select2().trigger('change');
                              ISactive = objectdata[0].ISActive;
                              if (ISactive == 1) {
                                    $('#counterstatus').val(1);
                                    $('#counterstatus').select2().trigger('change');
                              }
                              else {
                                    $('#counterstatus').val(0);
                                    $('#counterstatus').select2().trigger('change');
                              }
                              document.getElementById('counterlablename').innerHTML = "Edit counter - #" + objectdata[0].id + "";
                              $('#createcounter').addClass('show').removeClass('hide');
                        }

                  })
            }
      })

      $("body").on("click", ".deletecounter", function () {
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
                              url: "" + api + "delete_mst_counter",
                              type: "GET",
                              data: {
                                    id: categoryid
                              },
                              success: function () {
                                    toastr.success('Counter Delete successfull');
                                    setTimeout(() => {
                                          datacounter();
                                    }, 500);
                              }
                        })
                  } else {
                        swal.close();
                  }
            });
      });

      $('.closecreatecounter').click(function () {
            $('#createcounter').addClass('hide').removeClass('show')
      })

      $('body').on('click', '#countercheckbox', function () {
            var statusid = $(this).attr("for");
            if ($('#' + statusid + '.countercheck').prop('checked') == false) {
                  $('#' + statusid + '.countercheck').prop('checked', true);
                  updateCounterStatus(statusid, $('#' + statusid + '.countercheck').prop('checked'))
            }
            else {
                  $('#' + statusid + '.countercheck').prop('checked', false);
                  updateCounterStatus(statusid, $('#' + statusid + '.countercheck').prop('checked'))
            }
      });

      function generateHierarchyCode(dInput) {
            dInput = dInput.replace(/[_\W]+/g, "_")
            dInput = dInput.toUpperCase();
            $("#countercode").val(dInput)
      }

      $("#countername").keyup(function () {
            generateHierarchyCode(this.value);
      });

      $("#countername").change(function () {
            generateHierarchyCode(this.value);
      });

      $('#savecounter').click(function () {
            $('#counter_form-validate').validate();
            if ($('#counter_form-validate').valid()) {
                  Createcounter();
            }
      })

})

// $(document).ready(function () {
//       var mySelect2 = $('#counterprinter')

//       //initiate select
//       mySelect2.select2();

//       //global var for select 2 label
//       var select2label

//       $("#counter_form-validate").validate({

//             rules: {
//                   countername: {
//                         required: true
//                   },
//                   counterprinter: {
//                         required: true
//                   },
//                   counterremark: {
//                         required: true
//                   }
//             },
//             messages: {
//                   counterprinter: {
//                         required: "Please choose the printer",
//                   },

//             },
//             errorPlacement: function (label, element) {
//                   if (element.hasClass('web-select2')) {
//                         label.insertAfter(element.next('.select2-container')).addClass('mt-2 text-danger');
//                         select2label = label
//                   } else {
//                         label.addClass('mt-2 text-danger');
//                         label.insertAfter(element);
//                   }
//             },
//             highlight: function (element) {
//                   $(element).parent().addClass('is-invalid')
//                   $(element).addClass('form-control-danger')
//             },
//             success: function (label, element) {
//                   $(element).parent().removeClass('is-invalid')
//                   $(element).removeClass('form-control-danger')
//                   label.remove();
//             },
//             submitHandler: function (form) {
//             },
//       });

//       //watch the change on select
//       // mySelect2.on("change", function (e) {
//       //       select2label.remove(); //remove label
//       // });
// })

function datacounter() {
      var t = $('#mst_countertbl').DataTable({
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
                  "url": "" + api + "find_mst_counter",
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
                  "data": "counter_name"
            },
            {
                  "data": "code"
            },
            {
                  "data": "printer_id"
            },
            {
                  "data": "remark"
            },
            {
                  "data": null,
                  "render": function (data, type, full, meta) {
                        var buttonID = full.id;
                        if (data.ISActive == 1) {
                              return '<input class="slider-v1-input countercheck" type="checkbox" id="' + buttonID + '" checked><label class="slider-v1" for="' + buttonID + '" id="countercheckbox"></label>';
                        }
                        else {
                              return '<input class="slider-v1-input countercheck" type="checkbox" id="' + buttonID + '" onchange="updateCounterStatus(' + buttonID + ', '+ $(this).is(':checked') +')" ><label class="slider-v1" for="' + buttonID + '" id="countercheckbox"></label>';
                        }
                  },
            },
            {
                  "data": null,
                  "render": function (data, type, full, meta) {
                        var buttonID = full.id;
                        return '<a href="javascript:void(0)" class="btn btn-sm btn-success b-none bg-lightbrown white addnewcounter" title="Edit User product" id="addnewcounter" data-id="' + buttonID + '"><i class="fas fa-edit"></i></a><a href="javascript:void(0)" class="btn btn-sm btn-success b-none bg-lightbrown white  deletecounter  ms-2" title="Delete User product " id="deletecounter" data-value="' + buttonID + '"> <i class="fas fa-trash"></i></a>';
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

function Allcounter() {
      $('#mst_counter').click(function () {
            $('#allcounter').show();
      })
      $('.closetbl').click(function () {
            $('#allcounter').hide();
      })
      $(["aria-controls=mst_itmcategory"]).addClass('page-link');
}

function Createcounter() {
      var counterid = $('#createcounter').attr('data-id');
      var form = $('#counter_form-validate');
      console.log(form.serialize());
      if (counterid == 0) {
            $.ajax({
                  url: "" + api + "create_mst_counter",
                  type: "POST",
                  data:form.serialize() + '&id=' + counterid,
                  cashe: false,
                  success: function (data) {
                        $('#createcounter').addClass('hide').removeClass('show')
                        toastr.success('New Counter Add successfull');
                        setTimeout(() => {
                              datacounter();
                        }, 500);
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                        alert('Error: ' + jqXHR.status + '\n' + errorThrown);
                  },
            })
      }
      else {
            $.ajax({
                  url: "" + api + "create_mst_counter",
                  type: "POST",
                  data: form.serialize() + '&id=' + counterid,
                  cashe: false,
                  success: function (data) {
                        $('#createcounter').addClass('hide').removeClass('show')
                        toastr.success('Counter Updated Successfull');
                        setTimeout(() => {
                              datacounter();
                        }, 500);
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                        alert('Error: ' + jqXHR.status + '\n' + errorThrown);
                  },
            })
      }
}

window.updateCounterStatus = (id, ISActive) => {
      if (ISActive == false) {
            $.ajax({
                  url: "" + api + "update_counterstatus",
                  type: "POST",
                  data: {
                        id: id,
                        ISActive: "0"
                  },
                  cache: false,
                  success: function () {
                        toastr.success('Counter Status Deactive');
                  }
            })
      }
      else {
            $.ajax({
                  url: "" + api + "update_counterstatus",
                  type: "POST",
                  data: {
                        id: id,
                        ISActive: "1"
                  },
                  cache: false,
                  success: function () {
                        toastr.success('Counter Status Active');
                  }
            })
      }
}

$(document).ready(function () {
      $.ajax({
            url: "" + api + "find_mst_printer",
            type: "GET",
            data: {
                  type: "ACTIVE"
            },
            success: function (data) {
                  objdata = JSON.stringify(data.data)
                  objectdata = JSON.parse(objdata)
                  for (var i = 0; i < objectdata.length; i++) {
                        mark = `<option value="${objectdata[i].id}">${objectdata[i].name}</option>`;
                        document.querySelector('#counterprinter').insertAdjacentHTML('beforeend', mark);
                  }
            }
      })
})

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

function counterreset() {
      $('#counter_form-validate').trigger("reset");
      $('#counterstatus').select2("val", "1");
      $('#counterprinter').val("");
      $('#counterprinter').select2().trigger('change');
}