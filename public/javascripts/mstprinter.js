$(document).ready(function () {
      Allprinter();
      dataprinter();
      $('#printerstatus').select2({
            closeOnSelect: true
      });

      $("body").on("click", ".addnewprinter", function () {
            var printerid = $(this).attr("data-id");
            if (printerid == 0) {
                  printerreset()
                  $('#createprinter').attr('data-id', printerid)
                  document.getElementById('printerlabelname').innerHTML = "Add Printer"
                  $('#createprinter').removeClass('hide').addClass('show');
            }
            else {
                  $.ajax({
                        url: "" + api + "find_mst_printer",
                        type: "GET",
                        data: {
                              id: printerid,
                              type: "ALL"
                        },
                        cache: false,
                        success: function (data) {
                              objdata = JSON.stringify(data.data)
                              objectdata = JSON.parse(objdata)
                              $('#createprinter').attr('data-id', printerid)
                              document.getElementById('printername').value = objectdata[0].name;
                              document.getElementById('printerremark').value = objectdata[0].remark;
                              document.getElementById('printerip').value = objectdata[0].ip_address;
                              $("#printercode").val(objectdata[0].code)
                              ISactive = objectdata[0].ISActive;
                              if (ISactive == 1) {
                                    $('#printerstatus').val(1);
                                    $('#printerstatus').select2().trigger('change');
                              }
                              else {
                                    $('#printerstatus').val(0);
                                    $('#printerstatus').select2().trigger('change');
                              }
                              $('#printerstatus').val(ISactive);
                              document.getElementById('printerlabelname').innerHTML = "Edit Printer - #" + objectdata[0].id + ""
                              $('#createprinter').removeClass('hide').addClass('show');
                        }

                  })
            }
      })

      $("body").on("click", ".deleteprinter", function () {
            var printerid = $(this).attr("data-value");
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
                              url: "" + api + "delete_mst_printer",
                              type: "GET",
                              data: {
                                    id: printerid
                              },
                              success: function () {
                                    toastr.success('Printer Deleted Successfull');
                                    setTimeout(() => {
                                          dataprinter();
                                    }, 500);
                              }
                        })
                  } else {
                        swal.close();
                  }
            });
      });

      $('.closecreateprinter').click(function () {
            $('#createprinter').removeClass('show').addClass('hide')
      })


      $('body').on('click', '#printercheck', function () {
            var statusid = $(this).attr("for");
            console.log($('#' + statusid + '.printercheck').prop('checked'));
            if ($('#' + statusid + '.printercheck').prop('checked') == false) {
                  $('#' + statusid + '.printercheck').prop('checked', true);
                  updateprinterStatus(statusid, $('#' + statusid + '.printercheck').prop('checked'))
            }
            else {
                  $('#' + statusid + '.printercheck').prop('checked', false);
                  updateprinterStatus(statusid, $('#' + statusid + '.printercheck').prop('checked'))
            }
      });

      function generateHierarchyCode(dInput) {
            dInput = dInput.replace(/[_\W]+/g, "_")
            dInput = dInput.toUpperCase();
            $("#printercode").val(dInput)
      }

      $("#printername").keyup(function () {
            generateHierarchyCode(this.value);
      });

      $("#printername").change(function () {
            generateHierarchyCode(this.value);
      });

      $('#saveprinter').click(function () {
            $('#printer_form-validate').validate();
            if ($('#printer_form-validate').valid()) {
                  Createprinter();
            }
      })

})

function dataprinter() {
      var t = $('#mst_itemprinter').DataTable({
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
                  "url": "" + api + "find_mst_printer",
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
                  "data": "name"
            },
            {
                  "data": "code"
            },
            {
                  "data": "ip_address"
            },
            {
                  "data": "remark"
            },
            {
                  "data": null,
                  "render": function (data, type, full, meta) {
                        var buttonID = full.id;
                        if (data.ISActive == 1) {
                              return '<input class="slider-v1-input printercheck" type="checkbox" id="' + buttonID + '" checked><label class="slider-v1" for="' + buttonID + '" id="printercheck"></label>';
                        }
                        else {
                              return '<input class="slider-v1-input printercheck" type="checkbox" id="' + buttonID + '" onchange="updateprinterStatus(' + buttonID + ', '+ $(this).is(':checked') +')" ><label class="slider-v1" for="' + buttonID + '" id="printercheck"></label>';
                        }
                  },
            },
            {
                  "data": null,
                  "render": function (data, type, full, meta) {
                        var buttonID = full.id;
                        return '<a href="javascript:void(0)" class="btn btn-sm btn-success b-none bg-lightbrown white addnewprinter" title="Edit User product" id="addnewprinter" data-id="' + buttonID + '"><i class="fas fa-edit"></i></a><a href="javascript:void(0)" class="btn btn-sm btn-success b-none bg-lightbrown white deleteprinter ms-2" title="Delete User product" id="deleteprinter" data-value="' + buttonID + '"> <i class="fas fa-trash"></i></a>';
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

function Allprinter() {
      $('#mst_printer').click(function () {
            $('#allprinter').show();
      })
      $('#ClosePrinterModal').click(function () {
            $('#allprinter').hide();
      })
      $(["aria-controls=example1"]).addClass('page-link');
}

function Createprinter() {
      var printerid = $('#createprinter').attr('data-id');
      var printername = $('#printername').val();
      var status = $('#printerstatus').find(":selected").val();
      var remark = $('#printerremark').val();
      var printercode = $("#printercode").val()
      var ip = $('#printerip').val()
      if (printerid == 0) {
            $.ajax({
                  url: "" + api + "create_mst_printer",
                  type: "POST",
                  data: {
                        ipaddress: ip,
                        printercode: printercode,
                        isactive: status,
                        printerName: printername,
                        remark: remark,
                  },
                  cashe: false,
                  success: function (data) {
                        $('#createprinter').addClass('hide').removeClass('show')
                        toastr.success('New Printer Add successfull');
                        setTimeout(() => {
                              dataprinter();
                        }, 500);
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                        alert('Error: ' + jqXHR.status + '\n' + errorThrown);
                  },
            })
      }
      else {
            $.ajax({
                  url: "" + api + "create_mst_printer",
                  type: "POST",
                  data: {
                        ipaddress: ip,
                        printercode: printercode,
                        id: printerid,
                        isactive: status,
                        printerName: printername,
                        remark: remark,
                  },
                  cashe: false,
                  success: function (data) {
                        $('#createprinter').addClass('hide').removeClass('show');
                        toastr.success('Printer Updated Successfull');
                        setTimeout(() => {
                              dataprinter();
                        }, 500);

                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                        alert('Error: ' + jqXHR.status + '\n' + errorThrown);
                  },
            })
      }
}

window.updateprinterStatus = (id, ISActive) => {
      if (ISActive == false) {
            $.ajax({
                  url: "" + api + "update_printerstatus",
                  type: "POST",
                  data: {
                        id: id,
                        ISActive: "0"
                  },
                  cache: false,
                  success: function () {
                        toastr.success('Printer Status Deactive');
                  }
            })
      }
      else {
            $.ajax({
                  url: "" + api + "update_printerstatus",
                  type: "POST",
                  data: {
                        id: id,
                        ISActive: "1"
                  },
                  cache: false,
                  success: function () {
                        toastr.success('Printer Status Active');
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

function printerreset() {
      $('#printer_form-validate').trigger("reset");
      $('#printerstatus').select2("val", "1");
}
