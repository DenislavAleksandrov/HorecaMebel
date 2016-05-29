using HorecaBL.DB.Administration;
using HorecaMebel.Models.EF;
using HorecaMebel.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HorecaMebel.Models.References
{
    public class ReferencesViewModel : BaseModel
    {
        public List<Reference> AllReferences {get;set;} 

        public ReferencesViewModel(int basketCount, IReferencesDbContext referencesDb)
            : base(ControllersEnum.References, basketCount)
        {
            this.AllReferences = referencesDb.AllReferences();
        }
    }
}