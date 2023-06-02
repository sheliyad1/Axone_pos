$(document).ready(function () {
      Alltbl();
      datatbl();

      $("body").on("click", ".addnewtbl", function () {
            var tableid = $(this).attr("data-id");
            if (tableid == 0) {
                  tablereset()
                  $('#createtbl').attr('data-id', tableid);
                  $('#tablestatus').val(1);
                  $('#tablestatus').select2().trigger('change');
                  document.getElementById('tablelabelname').innerHTML = "Add Table";
                  $('#createtbl').addClass('show').removeClass('hide');
            }
            else {
                  $.ajax({
                        url: "" + api + "find_mst_tbl",
                        type: "GET",
                        data: {
                              id: tableid,
                              type: "ALL"
                        },
                        cache: false,
                        success: function (data) {
                              objdata = JSON.stringify(data.data)
                              objectdata = JSON.parse(objdata)
                              $('#createtbl').attr('data-id', tableid)
                              document.getElementById('tname').value = objectdata[0].TableName;
                              document.getElementById('remark').value = objectdata[0].Remark;
                              $("#codename").val(objectdata[0].TableCode)
                              ISactive = objectdata[0].ISActive;
                              if (ISactive == 1) {
                                    $('#tablestatus').val(1);
                                    $('#tablestatus').select2().trigger('change');
                              }
                              else {
                                    $('#tablestatus').val(0);
                                    $('#tablestatus').select2().trigger('change');
                              }
                              $('#tablestatus').val(ISactive);
                              document.getElementById('tablelabelname').innerHTML = "Edit Table - #" + objectdata[0].id + "";
                              $('#createtbl').addClass('show').removeClass('hide');
                        }

                  })
            }
      })

      $("body").on("click", ".deletetbl", function () {
            var tableid = $(this).attr("data-value");
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
                              url: "" + api + "delete_mst_tbl",
                              type: "GET",
                              data: {
                                    id: tableid
                              },
                              success: function () {
                                    toastr.success('Table Deleted Successfull');
                                    setTimeout(() => {
                                          datatbl();
                                    }, 500);
                              }
                        })
                  } else {
                        swal.close();
                  }
            });
      });

      $('.closecreatetbl').click(function () {
            $('#createtbl').addClass('hide').removeClass('show');
      })

      $('body').on('click', '#tblcheckbox', function () {
            var statusid = $(this).attr("for");
            if ($('#' + statusid + '.tablecheck').prop('checked') == false) {
                  $('#' + statusid + '.tablecheck').prop('checked', true);
                  updateTableStatus(statusid, $('#' + statusid + '.tablecheck').prop('checked'))
            }
            else {
                  $('#' + statusid + '.tablecheck').prop('checked', false);
                  updateTableStatus(statusid, $('#' + statusid + '.tablecheck').prop('checked'))
            }
      });

      function generateHierarchyCode(dInput) {
            dInput = dInput.replace(/[_\W]+/g, "_")
            dInput = dInput.toUpperCase();
            $("#codename").val(dInput)
      }

      $("#tname").keyup(function () {
            generateHierarchyCode(this.value);
      });

      $("#tname").change(function () {
            generateHierarchyCode(this.value);
      });

      $('#savetable').click(function () {
            $('#form-validate').validate();
            if ($('#form-validate').valid()) {
                  Createtable();
            }
      })
})


function datatbl() {
      var t = $('#example1').DataTable({
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
                  "url": "" + api + "find_mst_tbl",
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
                  "data": "TableName"
            },
            {
                  "data": "TableCode"
            },
            {
                  "data": "Remark"
            },
            {
                  "data": null,
                  "render": function (data, type, full, meta) {
                        var buttonID = full.id;
                        if (data.ISActive == 1) {
                              return '<input class="slider-v1-input tablecheck" type="checkbox" id="' + buttonID + '" checked><label class="slider-v1" for="' + buttonID + '" id="tblcheckbox"></label>';
                        }
                        else {
                              return '<input class="slider-v1-input tablecheck" type="checkbox" id="' + buttonID + '" onchange="updateTableStatus(' + buttonID + ', '+ $(this).is(':checked') +')" ><label class="slider-v1" for="' + buttonID + '" id="tblcheckbox"></label>';
                        }
                  },
            },
            {
                  "data": null,
                  "render": function (data, type, full, meta) {
                        var buttonID = full.id;
                        return '<a href="javascript:void(0)" class="btn btn-sm btn-success b-none bg-lightbrown white addnewtbl" title="Edit User product" id="addnewtbl" data-id="' + buttonID + '"><i class="fas fa-edit"></i></a><a href="javascript:void(0)" class="btn btn-sm btn-success b-none bg-lightbrown white deletetbl ms-2" title="Delete User product" id="deletetbl" data-value="' + buttonID + '"> <i class="fas fa-trash"></i></a>';
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
      // t.destroy();
};


function Alltbl() {
      $('#mst_table').click(function () {
            $('#alltbl').show()
      })
      $('.closemsttbl').click(function () {
            $('#alltbl').hide();
      })
      $(["aria-controls=example1"]).addClass('page-link');
}


function Createtable() {
      var tblid = $('#createtbl').attr('data-id');
      var form = $('#form-validate');
      console.log(form.serialize() + '&id=' + tblid);
      if (tblid == 0) {
            $.ajax({
                  url: "" + api + "create_mst_tbl",
                  type: "POST",
                  data: form.serialize() + '&id=' + tblid,
                  cashe: false,
                  success: function (data) {
                        $('#createtbl').addClass('hide').removeClass('show')
                        toastr.success('New Table Add successfull');
                        setTimeout(() => {
                              datatbl();
                        }, 500);
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                        alert('Error: ' + jqXHR.status + '\n' + errorThrown);
                  },
            })
      }
      else {
            $.ajax({
                  url: "" + api + "create_mst_tbl",
                  type: "POST",
                  data: form.serialize() + '&id=' + tblid,
                  cashe: false,
                  success: function (data) {
                        $('#createtbl').addClass('hide').removeClass('show');
                        toastr.success('Table Updated Successfull');
                        setTimeout(() => {
                              datatbl();
                        }, 500);

                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                        alert('Error: ' + jqXHR.status + '\n' + errorThrown);
                  },
            })
      }
}


window.updateTableStatus = (id, ISActive) => {
      if (ISActive == false) {
            $.ajax({
                  url: "" + api + "update_tblstatus",
                  type: "POST",
                  data: {
                        id: id,
                        ISActive: "0"
                  },
                  cache: false,
                  success: function () {
                        toastr.success('Table Status Dective');
                  }
            })
      }
      else {
            $.ajax({
                  url: "" + api + "update_tblstatus",
                  type: "POST",
                  data: {
                        id: id,
                        ISActive: "1"
                  },
                  cache: false,
                  success: function () {
                        toastr.success('Table Status Active');
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


function tablereset() {
      $('#form-validate').trigger("reset");
      $('#tablestatus').val(1);
      $('#tablestatus').select2().trigger('change');
}
