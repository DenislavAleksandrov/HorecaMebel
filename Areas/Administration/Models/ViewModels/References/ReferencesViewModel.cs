using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Areas.Administration.Models.ViewModels
{
    public class ReferencesViewModel : BaseModel
    {
        public List<Reference> References { get; set; }
        public ReferencesViewModel(IReferencesDbContext references): base(ControllersEnum.References)
        {
            this.References = references.AllReferences();
        }        
    }
}